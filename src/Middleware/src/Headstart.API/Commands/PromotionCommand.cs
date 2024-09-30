using Flurl.Http;
using Headstart.Common;
using ordercloud.integrations.library;
using OrderCloud.SDK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OrderCloud.Catalyst;
using Headstart.Common.Models;
using Headstart.Models;

namespace Headstart.API.Commands
{
    public interface IPromotionCommand
    {
        Task AutoApplyPromotions(string orderID);
        Task<LmsPromotion> GetPromotion(string promotionId, string orderID);
        Task<List<LmsPromotion>> GetPromoContent(DecodedToken decodedToken);
    }

    public class PromotionCommand : IPromotionCommand
    {
        private readonly IOrderCloudClient _oc;
        public PromotionCommand(IOrderCloudClient oc)
        {
            _oc = oc;
        }

        public async Task AutoApplyPromotions(string orderID)
        {
            await RemoveAllPromotionsAsync(orderID);
            var autoEligiblePromos = await _oc.Promotions.ListAsync(filters: "xp.Automatic=true");
            var requests = autoEligiblePromos.Items.Select(p => TryApplyPromoAsync(orderID, p.Code));
            await Task.WhenAll(requests);
        }

        public async Task<LmsPromotion> GetPromotion(string promotionId, string orderID)
        {
            var promotion = await _oc.Promotions.GetAsync<LmsPromotion>(promotionId);
            var order = await _oc.Orders.GetAsync(OrderDirection.Incoming, orderID);
            var user = await _oc.Users.GetAsync<User>(order.FromCompanyID, order.FromUserID);
            return promotion;
        }

        public async Task<List<LmsPromotion>> GetPromoContent(DecodedToken decodedToken)
        {
            var promoList = new List<LmsPromotion>();
            var meUserGroups = await _oc.Me.ListUserGroupsAsync<HSMeUserGroup>(null, null, null, 1, 20, null, decodedToken.AccessToken);
            // users only belong to 1 user group
            var meUG = meUserGroups.Items.FirstOrDefault().ID;
            var currentDate = DateTime.Now;
            var activePromotions = await _oc.Promotions.ListAsync<LmsPromotion>(filters: new { Active = true, StartDate = $"<={currentDate:yyyy-MM-dd}", ExpirationDate = $">={currentDate:yyyy-MM-dd}" });
            
            if (activePromotions.Items.Count > 0 && !string.IsNullOrEmpty(meUG))
            {
                foreach (var promotion in activePromotions.Items)
                {
                    // Check if UserGroups is null, if it is, assign an empty list to avoid null reference
                    var eligibleUG = promotion.xp?.UserGroups ?? new List<string>();
                    var hasPromoContent = promotion.xp?.PromoContent;
                    var userEligilble = eligibleUG.Contains(meUG);

                    if (userEligilble && !string.IsNullOrEmpty(hasPromoContent))
                    {
                        promoList.Add(promotion);
                    }
                }
            }
            return promoList;
        }

        private async Task RemoveAllPromotionsAsync(string orderID)
        {
            // ordercloud does not re-evaluate promotions when line items change
            // we must remove all promos and re-apply them to ensure promotion discounts are accurate
            var promos = await _oc.Orders.ListPromotionsAsync(OrderDirection.Incoming, orderID, pageSize: 100);
            var requests = promos.Items
                            .DistinctBy(p => p.ID) // the same promo may be applied to multiple line items on one order
                            .Select(p => RemovePromoAsync(orderID, p));
            var allTasks = Task.WhenAll(requests);

            try
            {
                await allTasks;
            }
            catch (Exception)
            {
                throw new CatalystBaseException(new ApiError
                {
                    ErrorCode = "Promotion.ErrorRemovingAll",
                    Message = "One or more promotions could not be removed",
                    Data = allTasks.Exception.InnerExceptions
                });
            }
        }

        private async Task<Order> RemovePromoAsync(string orderID, OrderPromotion promo)
        {
            try
            {
                return await _oc.Orders.RemovePromotionAsync(OrderDirection.Incoming, orderID, promo.Code);
            }
            catch
            {
                // this can leave us in a bad state if the promotion can't be deleted but no longer valid
                throw new CatalystBaseException(new ApiError
                {
                    ErrorCode = "Promotion.ErrorRemoving",
                    Message = $"Unable to remove promotion {promo.Code}",
                    Data = new
                    {
                        Promotion = promo
                    }
                });
            }
        }

        private async Task TryApplyPromoAsync(string orderID, string promoCode)
        {
            try
            {
                await _oc.Orders.AddPromotionAsync(OrderDirection.Incoming, orderID, promoCode);
            }
            catch
            {
                // Its not possible to know if a promo is valid without trying to add it
                // if it isn't valid it shouldn't show up as an error to the user
            }
        }
    }
}

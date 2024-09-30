using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Headstart.API.Commands;
using Headstart.API.Commands.Crud;
using Headstart.Common.Models;
using Headstart.Models;
using Headstart.Models.Attributes;
using Headstart.Models.Misc;
using Microsoft.AspNetCore.Mvc;
using ordercloud.integrations.library;
using OrderCloud.Catalyst;
using OrderCloud.SDK;

namespace Headstart.Common.Controllers
{
	/// <summary>
	/// Me and my stuff
	/// </summary> 
	[Route("me")]
	public class MeController : CatalystController
	{
		private readonly IMeProductCommand _meProductCommand;
		private readonly IPromotionCommand _promotionCommand;
		public MeController(IMeProductCommand meProductCommand, IPromotionCommand promotionCommand)
		{
			_meProductCommand = meProductCommand;
			_promotionCommand = promotionCommand;
		}

		/// <summary>
		/// GET Super Product
		/// </summary> 
		[HttpGet, Route("products/{productID}"), OrderCloudUserAuth(ApiRole.Shopper)]
		public async Task<SuperHSMeProduct> GetSuperProduct(string productID)
		{
			return await _meProductCommand.Get(productID, UserContext);
		}

		/// <summary>
		/// LIST products
		/// </summary> 
		[HttpGet, Route("products"), OrderCloudUserAuth(ApiRole.Shopper)]
		public async Task<ListPageWithFacets<HSMeProduct>> ListMeProducts(ListArgs<HSMeProduct> args)
		{
			return await _meProductCommand.List(args, UserContext);
		}

		/// <summary>
		/// POST request information about product
		/// </summary> 
		[HttpPost, Route("products/requestinfo"), OrderCloudUserAuth(ApiRole.Shopper)]
		public async Task RequestProductInfo([FromBody] ContactSupplierBody template)
        {
			await _meProductCommand.RequestProductInfo(template);
        }

		/// <summary>
		/// GET promotion messaging for User
		/// </summary>
		[HttpGet, Route("promotion-content"), OrderCloudUserAuth(ApiRole.Shopper)]
		public async Task<List<LmsPromotion>> GetPromoContent()
		{
			return await _promotionCommand.GetPromoContent(UserContext);
		}

	}
}

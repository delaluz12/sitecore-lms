using OrderCloud.SDK;
using System;
using System.Collections.Generic;
using System.Text;

namespace Headstart.Common.Models
{
    public class LmsPromotion : Promotion<PromotionXp> { }
    public class PromotionXp
    {
        public HSPromoType? Type { get; set; }
        public int? Value { get; set; } 
        public HSPromoEligibility? AppliesTo { get; set; }
        public List<string> SKUs { get; set; }
        public string Supplier { get; set; }
        public bool? Automatic { get; set; }
        public HSPromoMinRequirement MinReq { get; set; }
        public int? MaxShipCost { get; set; } 
        public BOGOPromotion BOGO { get; set; }
        public List<string> Buyers { get; set; }
        public bool? AllowAllUserGroups { get; set; }
        public List<string> UserGroups { get; set; }
        public string PromoContent { get; set; }
    }

    public class HSPromoMinRequirement
    {
        public MinRequirementType? Type { get; set; }
        public int? Int { get; set; }
    }

    public enum HSPromoType
    {
        Percentage,
        FixedAmount,
        FreeShipping,
        BOGO,
    }

    public enum HSPromoEligibility
    {
        EntireOrder,
        SpecificSupplier,
        SpecificSKUs,
    }

    public enum MinRequirementType
    {
        MinPurchase,
        MinItemQty,
    }

    public class BOGOPromotion
    {
        public HSBogoType Type { get; set; }
        public decimal? Value { get; set; }
        public BOGOSKU BuySKU { get; set; }
        public BOGOSKU GetSKU { get; set; }
    }

    public class BOGOSKU
    {
        public string SKU { get; set; }
        public int? Qty { get; set; }
    }

    public enum HSBogoType
    {
        Percentage,
        FixedAmount,
    }
}

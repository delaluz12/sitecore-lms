import {
  StripeCountryDefinition,
  StripeKeyMapDefinition,
} from '../models/stripe-types'

// @dynamic
export class StripeConfig {
  static getStripeCountries(): StripeCountryDefinition[] {
    return [
      {
        Country: 'United States',
        Code: 'US',
        StripeAccount: 'Sitecore USA, Inc.',
      },
      { Country: 'Argentina', Code: 'AR', StripeAccount: 'Sitecore USA, Inc.' },
      { Country: 'Aruba', Code: 'AW', StripeAccount: 'Sitecore USA, Inc.' },
      { Country: 'Barbados', Code: 'BB', StripeAccount: 'Sitecore USA, Inc.' },
      { Country: 'Belize', Code: 'BZ', StripeAccount: 'Sitecore USA, Inc.' },
      { Country: 'Bolivia', Code: 'BO', StripeAccount: 'Sitecore USA, Inc.' },
      { Country: 'Brazil', Code: 'BR', StripeAccount: 'Sitecore USA, Inc.' },
      { Country: 'Chile', Code: 'CL', StripeAccount: 'Sitecore USA, Inc.' },
      { Country: 'Colombia', Code: 'CO', StripeAccount: 'Sitecore USA, Inc.' },
      {
        Country: 'Costa Rica',
        Code: 'CR',
        StripeAccount: 'Sitecore USA, Inc.',
      },
      { Country: 'Cuba', Code: 'CU', StripeAccount: 'Sitecore USA, Inc.' },
      {
        Country: 'Dominican Republic',
        Code: 'DO',
        StripeAccount: 'Sitecore USA, Inc.',
      },
      { Country: 'Ecuador', Code: 'EC', StripeAccount: 'Sitecore USA, Inc.' },
      { Country: 'Mexico', Code: 'MX', StripeAccount: 'Sitecore USA, Inc.' },
      { Country: 'Panama', Code: 'PA', StripeAccount: 'Sitecore USA, Inc.' },
      { Country: 'Peru', Code: 'PE', StripeAccount: 'Sitecore USA, Inc.' },
      { Country: 'Uruguay', Code: 'UY', StripeAccount: 'Sitecore USA, Inc.' },
      {
        Country: 'Cambodia',
        Code: 'KH',
        StripeAccount: 'Sitecore Singapore Pte. Ltd.',
      },
      {
        Country: 'Hong Kong',
        Code: 'HK',
        StripeAccount: 'Sitecore Singapore Pte. Ltd.',
      },
      {
        Country: 'Indonesia',
        Code: 'ID',
        StripeAccount: 'Sitecore Singapore Pte. Ltd.',
      },
      {
        Country: 'Philippines',
        Code: 'PH',
        StripeAccount: 'Sitecore Singapore Pte. Ltd.',
      },
      {
        Country: 'Singapore',
        Code: 'SG',
        StripeAccount: 'Sitecore Singapore Pte. Ltd.',
      },
      {
        Country: 'Sri Lanka',
        Code: 'LK',
        StripeAccount: 'Sitecore Singapore Pte. Ltd.',
      },
      {
        Country: 'Thailand',
        Code: 'TH',
        StripeAccount: 'Sitecore Singapore Pte. Ltd.',
      },
      {
        Country: 'Vietnam',
        Code: 'VN',
        StripeAccount: 'Sitecore Singapore Pte. Ltd.',
      },
      {
        Country: 'Australia',
        Code: 'AU',
        StripeAccount: 'Sitecore Australia Pty Limited',
      },
      {
        Country: 'New Zealand',
        Code: 'NZ',
        StripeAccount: 'Sitecore Australia Pty Limited',
      },
      { Country: 'Canada', Code: 'CA', StripeAccount: 'Sitecore Canada, Ltd.' },
      {
        Country: 'Bulgaria',
        Code: 'BG',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Croatia',
        Code: 'HR',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Czech Republic',
        Code: 'CZ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Egypt',
        Code: 'EG',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Estonia',
        Code: 'EE',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Ethiopia',
        Code: 'ET',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Hungary',
        Code: 'HU',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Kazakhstan',
        Code: 'KZ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Latvia',
        Code: 'LV',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Liechtenstein',
        Code: 'LI',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Lithuania',
        Code: 'LT',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Malta',
        Code: 'MT',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Moldova',
        Code: 'MD',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Monaco',
        Code: 'MC',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Montenegro',
        Code: 'ME',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'North Macedonia',
        Code: 'MK',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Poland',
        Code: 'PL',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Portugal',
        Code: 'PT',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Qatar',
        Code: 'QA',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Romania',
        Code: 'RO',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Serbia',
        Code: 'RS',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Slovakia',
        Code: 'SK',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Slovenia',
        Code: 'SI',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'South Africa',
        Code: 'ZA',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Tanzania, United Republic of',
        Code: 'TZ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Turkey',
        Code: 'TR',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Ukraine',
        Code: 'UA',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Austria',
        Code: 'AT',
        StripeAccount: 'Sitecore Deutschland GmbH',
      },
      {
        Country: 'Germany',
        Code: 'DE',
        StripeAccount: 'Sitecore Deutschland GmbH',
      },
      { Country: 'Belgium', Code: 'BE', StripeAccount: 'Sitecore Belgium NV' },
      {
        Country: 'Luxembourg',
        Code: 'LU',
        StripeAccount: 'Sitecore Belgium NV',
      },
      {
        Country: 'Spain',
        Code: 'ES',
        StripeAccount: 'Sitecore Espana, S.L.U.',
      },
      { Country: 'France', Code: 'FR', StripeAccount: 'Sitecore France' },
      {
        Country: 'Netherlands',
        Code: 'NL',
        StripeAccount: 'Sitecore Nederland BV',
      },
      { Country: 'Sweden', Code: 'SE', StripeAccount: 'Sitecore Sverige AB' },
      {
        Country: 'Switzerland',
        Code: 'CH',
        StripeAccount: 'Sitecore Schweiz AG',
      },
      {
        Country: 'Gibraltar',
        Code: 'GI',
        StripeAccount: 'Sitecore UK Limited',
      },
      {
        Country: 'United Kingdom',
        Code: 'GB',
        StripeAccount: 'Sitecore UK Limited',
      },
      { Country: 'Denmark', Code: 'DK', StripeAccount: 'Sitecore Danmark A/S' },
      { Country: 'Finland', Code: 'FI', StripeAccount: 'Sitecore Danmark A/S' },
      { Country: 'Iceland', Code: 'IS', StripeAccount: 'Sitecore Danmark A/S' },
      { Country: 'Norway', Code: 'NO', StripeAccount: 'Sitecore Danmark A/S' },
      {
        Country: 'Ireland',
        Code: 'IE',
        StripeAccount: 'Sitecore Ireland Limited',
      },
      { Country: 'Italy', Code: 'IT', StripeAccount: 'Sitecore Italia S.R.L.' },
      {
        Country: 'Bahrain',
        Code: 'BH',
        StripeAccount: 'Sitecore Middle East FZ-LLC',
      },
      {
        Country: 'Jordan',
        Code: 'JO',
        StripeAccount: 'Sitecore Middle East FZ-LLC',
      },
      {
        Country: 'Lebanon',
        Code: 'LB',
        StripeAccount: 'Sitecore Middle East FZ-LLC',
      },
      {
        Country: 'Morocco',
        Code: 'MA',
        StripeAccount: 'Sitecore Middle East FZ-LLC',
      },
      {
        Country: 'Oman',
        Code: 'OM',
        StripeAccount: 'Sitecore Middle East FZ-LLC',
      },
      {
        Country: 'United Arab Emirates',
        Code: 'AE',
        StripeAccount: 'Sitecore Middle East FZ-LLC',
      },
      { Country: 'China', Code: 'CN', StripeAccount: 'PO_ONLY' },
      { Country: 'Cyprus', Code: 'CY', StripeAccount: 'PO_ONLY' },
      { Country: 'Greece', Code: 'GR', StripeAccount: 'PO_ONLY' },
      { Country: 'India', Code: 'IN', StripeAccount: 'PO_ONLY' },
      { Country: 'Japan', Code: 'JP', StripeAccount: 'PO_ONLY' },
      { Country: 'Malaysia', Code: 'MY', StripeAccount: 'PO_ONLY' },
      { Country: 'Saudi Arabia', Code: 'SA', StripeAccount: 'PO_ONLY' },
    ]
  }

  static getStripeKeyMap(): StripeKeyMapDefinition[] {
    return [
      {
        StripeAccount: 'Sitecore Australia Pty Limited',
        StripeKey: 'AustraliaKey',
        Currency: 'AUD',
        TestPublishableKey: 'pk_test_shDIuy6fBIMoenyiqKVi3icY00VxwwkZ1f',
        ProductionPublishableKey: 'pk_live_cupMY7SKYCL4YsZsI7VunWzV000vVlFTtb',
      },
      {
        StripeAccount: 'Sitecore Belgium NV',
        StripeKey: 'BelgiumKey',
        Currency: 'EUR',
        TestPublishableKey:
          'pk_test_51KnQaKCHRtvczjMiRRARLWjlFL07J0RoUiTupdMRuPDrQeOGWxcvtnXiIVsZ3mgBzEBcxuLZ5v6wKa9BLZTho8sJ002eiZ9CXX',
        ProductionPublishableKey:
          'pk_live_51KnQaKCHRtvczjMivBMATH29fB6zE5IO0QsIOlD9FMYxHok3eUcvms4cXciJfnXq4Xr2Ytwp89IbPO6IwwUK2Bcx008Ow0Sz2D',
      },
      {
        StripeAccount: 'Sitecore Canada, Ltd.',
        StripeKey: 'CanadaKey',
        Currency: 'CAD',
        TestPublishableKey: 'pk_test_mVR95BxeOtm6N2pwSOrX7S0D00uKRQyanR',
        ProductionPublishableKey: 'pk_live_BNFL0jtWJh04hLkumLmFlYzY00VMSVwy0L',
      },
      {
        StripeAccount: 'Sitecore Danmark A/S',
        StripeKey: 'DanmarkKey',
        Currency: 'DKK',
        TestPublishableKey:
          'pk_test_51KouPuBtmjtcY965SvCDLWx4jPXkoXhVDU9lXiV1UlwRRW56CJvivgoXYOGG62j4hv2YMQLvB97lR8F1rm46Rj5u00tnIZOd4p',
        ProductionPublishableKey:
          'pk_live_51KouPuBtmjtcY965mnACaEqiyNBqPUQBSzJA5h86DNhfF3T9dedxvohAiHLa8uNbO6alJWnNZFmttK6uecGzZShF00PSWp1JxJ',
      },
      {
        StripeAccount: 'Sitecore Deutschland GmbH',
        StripeKey: 'DeutschlandKey',
        Currency: 'EUR',
        TestPublishableKey:
          'pk_test_51Km1EPDjTpr2fhOzFuv62DM4vMzu8yEp352WjxjWEE6UKHx008mRqDCsRoOeI6XEhbwTPY4GiTnmqkNrDQknZ60q00SFoeA6J4',
        ProductionPublishableKey:
          'pk_live_51Km1EPDjTpr2fhOz1WsuekugfN0iWCyW4az7wQgP7ZvSldadBbwJaILBvrC971LY5MWVBqvM5uiptyMXDfrAo2KZ00oPz0omZ2',
      },
      {
        StripeAccount: 'Sitecore Espana, S.L.U.',
        StripeKey: 'SpainKey',
        Currency: 'EUR',
        TestPublishableKey:
          'pk_test_51KoBpVBvBciuK8IoSlNH7O1swGE0dA0wU07mq1a3ECKRqVgjXFRggAukju4SlXfCDLOfvCWg6LWqicunjLsivuDi005vgwW2yo',
        ProductionPublishableKey:
          'pk_live_51KoBpVBvBciuK8IoIXpWYRthhIZRfyf0uzMdYiCjr0BgCbiIB6sT7Y14tshwAs1rXmfKVsrCs6yRp1tJC9tmjbr700UcAyifyt',
      },
      {
        StripeAccount: 'Sitecore France',
        StripeKey: 'FranceKey',
        Currency: 'EUR',
        TestPublishableKey:
          'pk_test_51KoCmlBSGyGElXTHyVcO7qAAtVW1fcdTxZy840K4UtTy9XlzHzsvP9lc5RiEVmL5WZJb3ZDMLZ3tpkuxnql2LB1Y00RFsL9zPC',
        ProductionPublishableKey:
          'pk_live_51KoCmlBSGyGElXTHscQ4wpbIc5G6zpZ8xXllc5b2q2bOWgyHoTpjGtaiXiCr9NtKP4z3dpNQJyJPBGICmVgLNRH100uKmtP3Ha',
      },
      {
        StripeAccount: 'Sitecore International A/S',
        StripeKey: 'InternationalKey',
        Currency: 'DKK',
        TestPublishableKey:
          'pk_test_51K1tzmJJK6cnWxfq0fPC4hNk6OndSTBFUD4WRkCC2QcEUxFd9ZIcKB4S8L30AV7odFo9sMfI1ltNVT69nuDAO6o700BEuToehX',
        ProductionPublishableKey:
          'pk_live_51K1tzmJJK6cnWxfqswALbpBIsfLye7GnysMXDnXeoYXgiXRgFQKvSonNo0SUrcNHhBhiu5nPhO2GRDH4BP4TuC0q00qmJ65XZz',
      },
      {
        StripeAccount: 'Sitecore Ireland Limited',
        StripeKey: 'IrelandKey',
        Currency: 'EUR',
        TestPublishableKey:
          'pk_test_51KoURkKc4w4GwnaSVMRjYVcUwNtQuq9NlTVQXwYeteoDZHpVWVtBjaXE1pFExv300fe0dpMYI4X72nBIJ4bdY0pf00eaMWgTAy',
        ProductionPublishableKey:
          'pk_live_51KoURkKc4w4GwnaSWKQ4sKed8mIgjCDt4PEljr4V8nYfDzsQ5mpmerGloOKnlY4arxVIi8eCe2QayifUtzVKIDah00R3mRzT5J',
      },
      {
        StripeAccount: 'Sitecore Italia S.R.L.',
        StripeKey: 'ItaliaKey',
        Currency: 'EUR',
        TestPublishableKey:
          'pk_test_51KoXKTDVDE4D3onIctRYZcc9ADmaj6p6zxLDg6GBu9Vk5gcg1l4GiMjl51LovGneGRHOxQISfCOhYuUwEYRlS0mK000N20GfxS',
        ProductionPublishableKey:
          'pk_live_51KoXKTDVDE4D3onI86qHmKQXvDqUihb8lUrTblI8v0NdZx6i20apiO0a2sYbWw7jYoDKelkwB0KcaD9JaXXYgqlg00gFHAnJsa',
      },
      {
        StripeAccount: 'Sitecore Nederland BV',
        StripeKey: 'NederlandKey',
        Currency: 'EUR',
        TestPublishableKey:
          'pk_test_51KoteyHakB2NDfUmM9NUKdzmBzVnfLvDPDNuqgNC6ATUvSAVGFMWxk2MlyPnyUUkjSqAGj8wLD0NbvUQkRDmqVc300vm0e4RJQ',
        ProductionPublishableKey:
          'pk_live_51KoteyHakB2NDfUmfvtFC5VZnG6nUqENTwwpA0pUzPgzmyqBTDYrKXBgGy596nqvSnVpFqVWNKzjJkzVMAaIFTkf00BUpnUYYX',
      },
      {
        StripeAccount: 'Sitecore Schweiz AG',
        StripeKey: 'SwitzerlandKey',
        Currency: 'CHF',
        TestPublishableKey:
          'pk_test_51KotuWCAqOLXZ48sNPvr10HM4UUEx2dxtRW69GJ1ThFUEFzYkzHyTiJh28tMZgXUksM9W6NtaiK4KuFFk8yr7jhT00cvIA7miT',
        ProductionPublishableKey:
          'pk_live_51KotuWCAqOLXZ48sRM0OdmHe1fmbAxJirZvfRZamwuqVkunAmMiwB4CoyXSsKSR721KOSFYD3sQg5NKJzpHSPtMp00Njr5zTDQ',
      },
      {
        StripeAccount: 'Sitecore Singapore Pte. Ltd.',
        StripeKey: 'SingaporeKey',
        Currency: 'SGD',
        TestPublishableKey: 'pk_test_Yne3pA3wjY6GAJJvYyoKnWfY00rZjQXrqv',
        ProductionPublishableKey: 'pk_live_sCbL436E4pbky33jf1UDcXG500hbr9EckC',
      },
      {
        StripeAccount: 'Sitecore Sverige AB',
        StripeKey: 'SverigeKey',
        Currency: 'SEK',
        TestPublishableKey:
          'pk_test_51Kou9KF3la5aMXq0CDwlaNjMW01QhFA7aWGMTQ9gyTPRSwVj33oY5ztuHOrvMGFkJlCPbpkVXADMXQm09i3iSEiG00nBV4ZTtu',
        ProductionPublishableKey:
          'pk_live_51Kou9KF3la5aMXq04Fh5R2j7kaLpTr0ph5TgJFCYff2POrcbuGeWoL84apWmiu15lOc9xpkXthghimFKphAzXHHu003Wfdbis5',
      },
      {
        StripeAccount: 'Sitecore UK Limited',
        StripeKey: 'UKKey',
        Currency: 'GBP',
        TestPublishableKey:
          'pk_test_51KouH9JuASirL9xMbkNomC6FpbYdgrdgkp7xpq3lVpQObDquYRCQfVRxYXyn2J10zkd9nXHCqo7pUVR5TQCi4Y3D00LpVlP3LO',
        ProductionPublishableKey:
          'pk_live_51KouH9JuASirL9xMZ2ofJ9C60RlJpY91LiGWP9ZLO1kM5d6QnbGcdefbBz5jMYGJfYYqBVV42bWfVnOFdBENyvGP00v9IOIvjE',
      },
      {
        StripeAccount: 'Sitecore USA, Inc.',
        StripeKey: 'USAKey',
        Currency: 'USD',
        TestPublishableKey: 'pk_test_g3VSGYoz202H650TOj6HOgjZ00dWORR5Tt',
        ProductionPublishableKey: 'pk_live_s7vanMAyivh3sUfGiIWmi9nT00qdSMBqGm',
      },
      {
        StripeAccount: 'Sitecore Middle East FZ-LLC',
        StripeKey: 'MiddleEastKey',
        Currency: 'DKK',
        TestPublishableKey: 'PO_ONLY',
        ProductionPublishableKey: 'PO_ONLY',
      },
      {
        StripeAccount: 'PO_ONLY',
        StripeKey: 'NoKey',
        Currency: 'USD',
        TestPublishableKey: 'PO_ONLY',
        ProductionPublishableKey: 'PO_ONLY',
      },
    ]
  }
}

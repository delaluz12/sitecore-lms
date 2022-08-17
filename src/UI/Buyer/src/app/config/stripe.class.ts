import {
  StripeCountryDefinition,
  StripeKeyMapDefinition,
} from '../models/stripe-types'

// @dynamic
export class StripeConfig {
  static getStripeCountries(): StripeCountryDefinition[] {
    return [
      {
        Country: 'Afghanistan',
        Code: 'AF',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Åland Islands',
        Code: 'AX',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Albania',
        Code: 'AL',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Algeria',
        Code: 'DZ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'American Samoa',
        Code: 'AS',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Andorra',
        Code: 'AD',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Angola',
        Code: 'AO',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Anguilla',
        Code: 'AI',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Antarctica',
        Code: 'AQ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Antigua and Barbuda',
        Code: 'AG',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Argentina',
        Code: 'AR',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Armenia',
        Code: 'AM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Aruba',
        Code: 'AW',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Australia',
        Code: 'AU',
        StripeAccount: 'Sitecore Australia Pty Limited',
      },
      {
        Country: 'Austria',
        Code: 'AT',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Azerbaijan',
        Code: 'AZ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Bahamas (the)',
        Code: 'BS',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Bahrain',
        Code: 'BH',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Bangladesh',
        Code: 'BD',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Barbados',
        Code: 'BB',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Belarus',
        Code: 'BY',
        StripeAccount: 'Sitecore International A/S',
      },
      { Country: 'Belgium', Code: 'BE', StripeAccount: 'Sitecore Belgium NV' },
      {
        Country: 'Belize',
        Code: 'BZ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Benin',
        Code: 'BJ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Bermuda',
        Code: 'BM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Bhutan',
        Code: 'BT',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Bolivia (Plurinational State of)',
        Code: 'BO',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Bonaire, Sint Eustatius and Saba',
        Code: 'BQ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Bosnia and Herzegovina',
        Code: 'BA',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Botswana',
        Code: 'BW',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Bouvet Island',
        Code: 'BV',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Brazil',
        Code: 'BR',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'British Indian Ocean Territory (the)',
        Code: 'IO',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Brunei Darussalam',
        Code: 'BN',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Bulgaria',
        Code: 'BG',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Burkina Faso',
        Code: 'BF',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Burundi',
        Code: 'BI',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Cabo Verde',
        Code: 'CV',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Cambodia',
        Code: 'KH',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Cameroon',
        Code: 'CM',
        StripeAccount: 'Sitecore International A/S',
      },
      { Country: 'Canada', Code: 'CA', StripeAccount: 'Sitecore Canada, Ltd.' },
      {
        Country: 'Cayman Islands (the)',
        Code: 'KY',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Central African Republic (the)',
        Code: 'CF',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Chad',
        Code: 'TD',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Chile',
        Code: 'CL',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'China',
        Code: 'CN',
        StripeAccount: 'Sitecore Software (Shanghai) Co. Ltd.',
      },
      {
        Country: 'Christmas Island',
        Code: 'CX',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Cocos (Keeling) Islands (the)',
        Code: 'CC',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Colombia',
        Code: 'CO',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Comoros (the)',
        Code: 'KM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Congo (the Democratic Republic of the)',
        Code: 'CD',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Congo (the)',
        Code: 'CG',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Cook Islands (the)',
        Code: 'CK',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Costa Rica',
        Code: 'CR',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: "Côte d'Ivoire",
        Code: 'CI',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Croatia',
        Code: 'HR',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Cuba',
        Code: 'CU',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Curaçao',
        Code: 'CW',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Cyprus',
        Code: 'CY',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Czechia',
        Code: 'CZ',
        StripeAccount: 'Sitecore International A/S',
      },
      { Country: 'Denmark', Code: 'DK', StripeAccount: 'Sitecore Danmark A/S' },
      {
        Country: 'Djibouti',
        Code: 'DJ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Dominica',
        Code: 'DM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Dominican Republic (the)',
        Code: 'DO',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Ecuador',
        Code: 'EC',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Egypt',
        Code: 'EG',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'El Salvador',
        Code: 'SV',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Equatorial Guinea',
        Code: 'GQ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Eritrea',
        Code: 'ER',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Estonia',
        Code: 'EE',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Eswatini',
        Code: 'SZ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Ethiopia',
        Code: 'ET',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Falkland Islands (the) [Malvinas]',
        Code: 'FK',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Faroe Islands (the)',
        Code: 'FO',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Fiji',
        Code: 'FJ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Finland',
        Code: 'FI',
        StripeAccount: 'Sitecore International A/S',
      },
      { Country: 'France', Code: 'FR', StripeAccount: 'Sitecore France' },
      {
        Country: 'French Guiana',
        Code: 'GF',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'French Polynesia',
        Code: 'PF',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'French Southern Territories (the)',
        Code: 'TF',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Gabon',
        Code: 'GA',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Gambia (the)',
        Code: 'GM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Georgia',
        Code: 'GE',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Germany',
        Code: 'DE',
        StripeAccount: 'Sitecore Deutschland GmbH',
      },
      {
        Country: 'Ghana',
        Code: 'GH',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Gibraltar',
        Code: 'GI',
        StripeAccount: 'Sitecore International A/S',
      },
      { Country: 'Greece', Code: 'GR', StripeAccount: 'Moosend PC' },
      {
        Country: 'Greenland',
        Code: 'GL',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Grenada',
        Code: 'GD',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Guadeloupe',
        Code: 'GP',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Guam',
        Code: 'GU',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Guatemala',
        Code: 'GT',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Guernsey',
        Code: 'GG',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Guinea',
        Code: 'GN',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Guinea-Bissau',
        Code: 'GW',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Guyana',
        Code: 'GY',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Haiti',
        Code: 'HT',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Heard Island and McDonald Islands',
        Code: 'HM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Holy See (the)',
        Code: 'VA',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Honduras',
        Code: 'HN',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Hong Kong',
        Code: 'HK',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Hungary',
        Code: 'HU',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Iceland',
        Code: 'IS',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'India',
        Code: 'IN',
        StripeAccount: 'Sitecore India Private Ltd.',
      },
      {
        Country: 'Indonesia',
        Code: 'ID',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Iran (Islamic Republic of)',
        Code: 'IR',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Iraq',
        Code: 'IQ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Ireland',
        Code: 'IE',
        StripeAccount: 'Sitecore Ireland Ltd.',
      },
      {
        Country: 'Isle of Man',
        Code: 'IM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Israel',
        Code: 'IL',
        StripeAccount: 'Sitecore International A/S',
      },
      { Country: 'Italy', Code: 'IT', StripeAccount: 'Sitecore Italia S.R.L.' },
      {
        Country: 'Jamaica',
        Code: 'JM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Japan',
        Code: 'JP',
        StripeAccount: 'Sitecore Japan Co. Ltd.',
      },
      {
        Country: 'Jersey',
        Code: 'JE',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Jordan',
        Code: 'JO',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Kazakhstan',
        Code: 'KZ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Kenya',
        Code: 'KE',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Kiribati',
        Code: 'KI',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: "Korea (the Democratic People's Republic of)",
        Code: 'KP',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Korea (the Republic of)',
        Code: 'KR',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Kuwait',
        Code: 'KW',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Kyrgyzstan',
        Code: 'KG',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: "Lao People's Democratic Republic (the)",
        Code: 'LA',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Latvia',
        Code: 'LV',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Lebanon',
        Code: 'LB',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Lesotho',
        Code: 'LS',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Liberia',
        Code: 'LR',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Libya',
        Code: 'LY',
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
        Country: 'Luxembourg',
        Code: 'LU',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Macao',
        Code: 'MO',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Madagascar',
        Code: 'MG',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Malawi',
        Code: 'MW',
        StripeAccount: 'Sitecore International A/S',
      },
      { Country: 'Malaysia', Code: 'MY', StripeAccount: 'Sitecore Malaysia' },
      {
        Country: 'Maldives',
        Code: 'MV',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Mali',
        Code: 'ML',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Malta',
        Code: 'MT',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Marshall Islands (the)',
        Code: 'MH',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Martinique',
        Code: 'MQ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Mauritania',
        Code: 'MR',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Mauritius',
        Code: 'MU',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Mayotte',
        Code: 'YT',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Mexico',
        Code: 'MX',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Micronesia (Federated States of)',
        Code: 'FM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Moldova (the Republic of)',
        Code: 'MD',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Monaco',
        Code: 'MC',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Mongolia',
        Code: 'MN',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Montenegro',
        Code: 'ME',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Montserrat',
        Code: 'MS',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Morocco',
        Code: 'MA',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Mozambique',
        Code: 'MZ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Myanmar',
        Code: 'MM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Namibia',
        Code: 'NA',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Nauru',
        Code: 'NR',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Nepal',
        Code: 'NP',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Netherlands (the)',
        Code: 'NL',
        StripeAccount: 'Sitecore Nederland BV',
      },
      {
        Country: 'New Caledonia',
        Code: 'NC',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'New Zealand',
        Code: 'NZ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Nicaragua',
        Code: 'NI',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Niger (the)',
        Code: 'NE',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Nigeria',
        Code: 'NG',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Niue',
        Code: 'NU',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Norfolk Island',
        Code: 'NF',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'North Macedonia',
        Code: 'MK',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Northern Mariana Islands (the)',
        Code: 'MP',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Norway',
        Code: 'NO',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Oman',
        Code: 'OM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Pakistan',
        Code: 'PK',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Palau',
        Code: 'PW',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Palestine, State of',
        Code: 'PS',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Panama',
        Code: 'PA',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Papua New Guinea',
        Code: 'PG',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Paraguay',
        Code: 'PY',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Peru',
        Code: 'PE',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Philippines (the)',
        Code: 'PH',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Pitcairn',
        Code: 'PN',
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
        Country: 'Puerto Rico',
        Code: 'PR',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Qatar',
        Code: 'QA',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Réunion',
        Code: 'RE',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Romania',
        Code: 'RO',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Russian Federation (the)',
        Code: 'RU',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Rwanda',
        Code: 'RW',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Saint Barthélemy',
        Code: 'BL',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Saint Helena, Ascension and Tristan da Cunha',
        Code: 'SH',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Saint Kitts and Nevis',
        Code: 'KN',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Saint Lucia',
        Code: 'LC',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Saint Martin (French part)',
        Code: 'MF',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Saint Pierre and Miquelon',
        Code: 'PM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Saint Vincent and the Grenadines',
        Code: 'VC',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Samoa',
        Code: 'WS',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'San Marino',
        Code: 'SM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Sao Tome and Principe',
        Code: 'ST',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Saudi Arabia',
        Code: 'SA',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Senegal',
        Code: 'SN',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Serbia',
        Code: 'RS',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Seychelles',
        Code: 'SC',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Sierra Leone',
        Code: 'SL',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Singapore',
        Code: 'SG',
        StripeAccount: 'Sitecore Singapore Pte. Ltd.',
      },
      {
        Country: 'Sint Maarten (Dutch part)',
        Code: 'SX',
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
        Country: 'Solomon Islands',
        Code: 'SB',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Somalia',
        Code: 'SO',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'South Africa',
        Code: 'ZA',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'South Georgia and the South Sandwich Islands',
        Code: 'GS',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'South Sudan',
        Code: 'SS',
        StripeAccount: 'Sitecore International A/S',
      },
      { Country: 'Spain', Code: 'ES', StripeAccount: 'Sitecore España S.L.' },
      {
        Country: 'Sri Lanka',
        Code: 'LK',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Sudan (the)',
        Code: 'SD',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Suriname',
        Code: 'SR',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Svalbard and Jan Mayen',
        Code: 'SJ',
        StripeAccount: 'Sitecore International A/S',
      },
      { Country: 'Sweden', Code: 'SE', StripeAccount: 'Sitecore Sverige AB' },
      {
        Country: 'Switzerland',
        Code: 'CH',
        StripeAccount: 'Sitecore Schweiz AG',
      },
      {
        Country: 'Syrian Arab Republic (the)',
        Code: 'SY',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Taiwan (Province of China)',
        Code: 'TW',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Tajikistan',
        Code: 'TJ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Tanzania, the United Republic of',
        Code: 'TZ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Thailand',
        Code: 'TH',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Timor-Leste',
        Code: 'TL',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Togo',
        Code: 'TG',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Tokelau',
        Code: 'TK',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Tonga',
        Code: 'TO',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Trinidad and Tobago',
        Code: 'TT',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Tunisia',
        Code: 'TN',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Turkey',
        Code: 'TR',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Turkmenistan',
        Code: 'TM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Turks and Caicos Islands (the)',
        Code: 'TC',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Tuvalu',
        Code: 'TV',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Uganda',
        Code: 'UG',
        StripeAccount: 'Sitecore International A/S',
      },
      { Country: 'Ukraine', Code: 'UA', StripeAccount: 'Sitecore Ukraine' },
      {
        Country: 'United Arab Emirates (the)',
        Code: 'AE',
        StripeAccount: 'Sitecore Middle East DMCC',
      },
      {
        Country: 'United Kingdom of Great Britain and Northern Ireland (the)',
        Code: 'GB',
        StripeAccount: 'Sitecore UK Ltd.',
      },
      {
        Country: 'United States Minor Outlying Islands (the)',
        Code: 'UM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'United States of America (the)',
        Code: 'US',
        StripeAccount: 'Sitecore USA, Inc.',
      },
      {
        Country: 'Uruguay',
        Code: 'UY',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Uzbekistan',
        Code: 'UZ',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Vanuatu',
        Code: 'VU',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Venezuela (Bolivarian Republic of)',
        Code: 'VE',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Viet Nam',
        Code: 'VN',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Virgin Islands (British)',
        Code: 'VG',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Virgin Islands (U.S.)',
        Code: 'VI',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Wallis and Futuna',
        Code: 'WF',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Western Sahara*',
        Code: 'EH',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Yemen',
        Code: 'YE',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Zambia',
        Code: 'ZM',
        StripeAccount: 'Sitecore International A/S',
      },
      {
        Country: 'Zimbabwe',
        Code: 'ZW',
        StripeAccount: 'Sitecore International A/S',
      },
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
        StripeAccount: 'Sitecore Bulgaria EOOD',
        StripeKey: 'BulgariaKey',
        Currency: 'BGN',
        TestPublishableKey:
          'pk_test_51KoCRGKzZX0R09IASXEySEC7GY3xvTaJk6K3tVlaCCoxLh8dO9ASeDVt0Dba1owd172yoOT6S9RA0UhLNyPVtOph00LMBcSSK9',
        ProductionPublishableKey:
          'pk_live_51K1tzmJJK6cnWxfqswALbpBIsfLye7GnysMXDnXeoYXgiXRgFQKvSonNo0SUrcNHhBhiu5nPhO2GRDH4BP4TuC0q00qmJ65XZz',
      },
      {
        StripeAccount: 'Sitecore Canada, Ltd.',
        StripeKey: 'CanadaKey',
        Currency: 'CAD',
        TestPublishableKey: 'pk_test_mVR95BxeOtm6N2pwSOrX7S0D00uKRQyanR',
        ProductionPublishableKey: 'pk_live_BNFL0jtWJh04hLkumLmFlYzY00VMSVwy0L',
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
        StripeAccount: 'Sitecore Danmark A/S',
        StripeKey: 'DanmarkKey',
        Currency: 'DKK',
        TestPublishableKey:
          'pk_test_51KouPuBtmjtcY965SvCDLWx4jPXkoXhVDU9lXiV1UlwRRW56CJvivgoXYOGG62j4hv2YMQLvB97lR8F1rm46Rj5u00tnIZOd4p',
        ProductionPublishableKey:
          'pk_live_51KouPuBtmjtcY965mnACaEqiyNBqPUQBSzJA5h86DNhfF3T9dedxvohAiHLa8uNbO6alJWnNZFmttK6uecGzZShF00PSWp1JxJ',
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
        StripeAccount: 'Sitecore France',
        StripeKey: 'FranceKey',
        Currency: 'EUR',
        TestPublishableKey:
          'pk_test_51KoCmlBSGyGElXTHyVcO7qAAtVW1fcdTxZy840K4UtTy9XlzHzsvP9lc5RiEVmL5WZJb3ZDMLZ3tpkuxnql2LB1Y00RFsL9zPC',
        ProductionPublishableKey:
          'pk_live_51KoCmlBSGyGElXTHscQ4wpbIc5G6zpZ8xXllc5b2q2bOWgyHoTpjGtaiXiCr9NtKP4z3dpNQJyJPBGICmVgLNRH100uKmtP3Ha',
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
        StripeAccount: 'Sitecore Ireland Ltd.',
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
        StripeAccount: 'Sitecore España S.L.',
        StripeKey: 'SpainKey',
        Currency: 'EUR',
        TestPublishableKey:
          'pk_test_51KoBpVBvBciuK8IoSlNH7O1swGE0dA0wU07mq1a3ECKRqVgjXFRggAukju4SlXfCDLOfvCWg6LWqicunjLsivuDi005vgwW2yo',
        ProductionPublishableKey:
          'pk_live_51KoBpVBvBciuK8IoIXpWYRthhIZRfyf0uzMdYiCjr0BgCbiIB6sT7Y14tshwAs1rXmfKVsrCs6yRp1tJC9tmjbr700UcAyifyt',
      },
      {
        StripeAccount: 'Sitecore UK Ltd.',
        StripeKey: 'UKKey',
        Currency: 'GBP',
        TestPublishableKey:
          'pk_test_51KouH9JuASirL9xMbkNomC6FpbYdgrdgkp7xpq3lVpQObDquYRCQfVRxYXyn2J10zkd9nXHCqo7pUVR5TQCi4Y3D00LpVlP3LO',
        ProductionPublishableKey:
          'pk_live_51KouH9JuASirL9xMZ2ofJ9C60RlJpY91LiGWP9ZLO1kM5d6QnbGcdefbBz5jMYGJfYYqBVV42bWfVnOFdBENyvGP00v9IOIvjE',
      },
      {
        StripeAccount: 'Sitecore Japan Co. Ltd.',
        StripeKey: 'JapanKey',
        Currency: 'JPY',
        TestPublishableKey:
          'pk_test_51KmPgqEOkoZ77lxQiOfkJZjfxYibJ65e5W4VVVS0U1CYqT6hjsmgzk9CaHmWXeAKBr0rL9WSCdzlyWgBR598We1l0090xlMy0z',
        ProductionPublishableKey:
          'pk_live_51K1tzmJJK6cnWxfqswALbpBIsfLye7GnysMXDnXeoYXgiXRgFQKvSonNo0SUrcNHhBhiu5nPhO2GRDH4BP4TuC0q00qmJ65XZz',
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
        StripeAccount: 'Sitecore Singapore Pte. Ltd.',
        StripeKey: 'SingaporeKey',
        Currency: 'SGD',
        TestPublishableKey: 'pk_test_Yne3pA3wjY6GAJJvYyoKnWfY00rZjQXrqv',
        ProductionPublishableKey: 'pk_live_sCbL436E4pbky33jf1UDcXG500hbr9EckC',
      },
      {
        StripeAccount: 'Sitecore USA, Inc.',
        StripeKey: 'USAKey',
        Currency: 'USD',
        TestPublishableKey: 'pk_test_g3VSGYoz202H650TOj6HOgjZ00dWORR5Tt',
        ProductionPublishableKey: 'pk_live_s7vanMAyivh3sUfGiIWmi9nT00qdSMBqGm',
      },
      {
        StripeAccount: 'Sitecore Software (Shanghai) Co. Ltd.',
        StripeKey: 'SoftwareKey',
        Currency: 'DKK',
        TestPublishableKey:
          'pk_test_51K1tzmJJK6cnWxfq0fPC4hNk6OndSTBFUD4WRkCC2QcEUxFd9ZIcKB4S8L30AV7odFo9sMfI1ltNVT69nuDAO6o700BEuToehX',
        ProductionPublishableKey:
          'pk_live_51K1tzmJJK6cnWxfqswALbpBIsfLye7GnysMXDnXeoYXgiXRgFQKvSonNo0SUrcNHhBhiu5nPhO2GRDH4BP4TuC0q00qmJ65XZz',
      },
      {
        StripeAccount: 'Moosend PC',
        StripeKey: 'MoosendKey',
        Currency: 'DKK',
        TestPublishableKey:
          'pk_test_51K1tzmJJK6cnWxfq0fPC4hNk6OndSTBFUD4WRkCC2QcEUxFd9ZIcKB4S8L30AV7odFo9sMfI1ltNVT69nuDAO6o700BEuToehX',
        ProductionPublishableKey:
          'pk_live_51K1tzmJJK6cnWxfqswALbpBIsfLye7GnysMXDnXeoYXgiXRgFQKvSonNo0SUrcNHhBhiu5nPhO2GRDH4BP4TuC0q00qmJ65XZz',
      },
      {
        StripeAccount: 'Sitecore India Private Ltd.',
        StripeKey: 'IndiaKey',
        Currency: 'DKK',
        TestPublishableKey:
          'pk_test_51K1tzmJJK6cnWxfq0fPC4hNk6OndSTBFUD4WRkCC2QcEUxFd9ZIcKB4S8L30AV7odFo9sMfI1ltNVT69nuDAO6o700BEuToehX',
        ProductionPublishableKey:
          'pk_live_51K1tzmJJK6cnWxfqswALbpBIsfLye7GnysMXDnXeoYXgiXRgFQKvSonNo0SUrcNHhBhiu5nPhO2GRDH4BP4TuC0q00qmJ65XZz',
      },
      {
        StripeAccount: 'Sitecore Malaysia',
        StripeKey: 'MalaysiaKey',
        Currency: 'DKK',
        TestPublishableKey:
          'pk_test_51K1tzmJJK6cnWxfq0fPC4hNk6OndSTBFUD4WRkCC2QcEUxFd9ZIcKB4S8L30AV7odFo9sMfI1ltNVT69nuDAO6o700BEuToehX',
        ProductionPublishableKey:
          'pk_live_51K1tzmJJK6cnWxfqswALbpBIsfLye7GnysMXDnXeoYXgiXRgFQKvSonNo0SUrcNHhBhiu5nPhO2GRDH4BP4TuC0q00qmJ65XZz',
      },
      {
        StripeAccount: 'Sitecore Ukraine',
        StripeKey: 'UkraineKey',
        Currency: 'DKK',
        TestPublishableKey:
          'pk_test_51K1tzmJJK6cnWxfq0fPC4hNk6OndSTBFUD4WRkCC2QcEUxFd9ZIcKB4S8L30AV7odFo9sMfI1ltNVT69nuDAO6o700BEuToehX',
        ProductionPublishableKey:
          'pk_live_51K1tzmJJK6cnWxfqswALbpBIsfLye7GnysMXDnXeoYXgiXRgFQKvSonNo0SUrcNHhBhiu5nPhO2GRDH4BP4TuC0q00qmJ65XZz',
      },
      {
        StripeAccount: 'Sitecore Middle East DMCC',
        StripeKey: 'MiddleEastKey',
        Currency: 'DKK',
        TestPublishableKey:
          'pk_test_51K1tzmJJK6cnWxfq0fPC4hNk6OndSTBFUD4WRkCC2QcEUxFd9ZIcKB4S8L30AV7odFo9sMfI1ltNVT69nuDAO6o700BEuToehX',
        ProductionPublishableKey:
          'pk_live_51K1tzmJJK6cnWxfqswALbpBIsfLye7GnysMXDnXeoYXgiXRgFQKvSonNo0SUrcNHhBhiu5nPhO2GRDH4BP4TuC0q00qmJ65XZz',
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
    ]
  }
}
export interface StripeCountryDefinition {
  Country: string
  Code: string
  StripeAccount: string
}

export interface StripeKeyMapDefinition {
  StripeAccount: string
  StripeKey: string
  Currency: string
  TestPublishableKey: string
  ProductionPublishableKey: string
}

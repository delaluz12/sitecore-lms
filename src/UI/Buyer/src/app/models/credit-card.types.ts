import { OrderCloudIntegrationsCreditCardToken } from '@ordercloud/headstart-sdk'
import { Address, BuyerCreditCard } from 'ordercloud-javascript-sdk'

export interface CreditCardFormOutput {
  card: OrderCloudIntegrationsCreditCardToken
  cvv: string
}

export interface SelectedCreditCard {
  SavedCard?: HSBuyerCreditCard
  NewCard?: OrderCloudIntegrationsCreditCardToken
  CVV: string
}

export interface CreditCard {
  token: string
  name: string
  month: string
  year: string
  street: string
  state: string
  city: string
  zip: string
  country: string
  cvv: string
}

export interface Tip {
  amount: number
}

export interface AmountDetails {
  tip: Tip
}

export interface StripeIntent {
  id: string
  object: string
  amount: number
  amount_details?: AmountDetails
  automatic_payment_methods?: boolean
  canceled_at?: string
  cancellation_reason?: string
  capture_method: string
  client_secret: string
  confirmation_method: string
  created: number
  currency: string
  description?: string
  last_payment_error?: string
  livemode: boolean
  next_action?: string
  payment_method: string
  payment_method_types: string[]
  processing?: string
  receipt_email?: string
  setup_future_usage?: string
  shipping?: string
  source?: string
  status: string
}

export type HSBuyerCreditCard = BuyerCreditCard<CreditCardXP>

export interface CreditCardXP {
  CCBillingAddress: Address
}

export type ComponentChange<T, P extends keyof T> = {
  previousValue: T[P]
  currentValue: T[P]
  firstChange: boolean
}

export type ComponentChanges<T> = {
  [P in keyof T]?: ComponentChange<T, P>
}

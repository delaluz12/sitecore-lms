import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core'
import {
  Address,
  BuyerAddress,
  BuyerCreditCard,
  ListPage,
  Me,
  OrderPromotion,
} from 'ordercloud-javascript-sdk'
import {
  HeadStartSDK,
  HSAddressBuyer,
  HSOrder,
} from '@ordercloud/headstart-sdk'
import { groupBy as _groupBy } from 'lodash'
import { uniqBy as _uniqBy } from 'lodash'
import { CheckoutService } from 'src/app/services/order/checkout.service'
import { ShopperContextService } from 'src/app/services/shopper-context/shopper-context.service'
import {
  SelectedCreditCard,
  StripeIntent,
} from 'src/app/models/credit-card.types'
import { AcceptedPaymentTypes } from 'src/app/models/checkout.types'
import { OrderSummaryMeta } from 'src/app/models/order.types'
import { AppConfig } from 'src/app/models/environment.types'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { getSuggestedAddresses } from 'src/app/services/address-suggestion.helper'

@Component({
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class OCMCheckoutPayment implements OnInit {
  @Input() cards: ListPage<BuyerCreditCard>
  @Input() isAnon: boolean
  @Input() order: HSOrder
  @Input() paymentError: string
  @Input() orderSummaryMeta: OrderSummaryMeta
  @Output() cardSelected = new EventEmitter<StripeIntent>()
  @Output() continue = new EventEmitter<void>()
  @Output() promosChanged = new EventEmitter<OrderPromotion[]>()
  checkout: CheckoutService = this.context.order.checkout
  _orderCurrency: string
  _acceptedPaymentMethods: string[]
  selectedPaymentMethod: AcceptedPaymentTypes
  POTermsAccepted: boolean
  faCheckCircle = faCheckCircle
  existingBillingAddresses: ListPage<BuyerAddress>
  selectedBillingAddress: BuyerAddress
  showNewAddressForm = false
  suggestedAddresses: BuyerAddress[]
  existingBuyerLocations: ListPage<BuyerAddress>
  selectedBuyerLocation: BuyerAddress
  homeCountry: string
  readonly NEW_ADDRESS_CODE = 'new'
  disablePO = false

  constructor(
    private context: ShopperContextService,
    private appConfig: AppConfig
  ) {}

  ngOnInit(): void {
    this._orderCurrency = this.context.currentUser.get().Currency
    this._acceptedPaymentMethods = this.getAcceptedPaymentMethods()
    this.selectedPaymentMethod = this
      ._acceptedPaymentMethods?.[0] as AcceptedPaymentTypes
    this.ListAddressesForBilling()
    const lineItems = this.context.order.getLineItems()
    lineItems.Items.forEach((line) => {
      if (line?.Product?.xp?.lms_SubscriptionUuid) {
        this.disablePO = true
      }
    })
  }

  getAcceptedPaymentMethods(): string[] {
    if (
      this.appConfig?.acceptedPaymentMethods == null ||
      this.appConfig?.acceptedPaymentMethods?.length < 1
    ) {
      return [AcceptedPaymentTypes.CreditCard]
    }
    return this.appConfig.acceptedPaymentMethods
  }

  selectPaymentMethod(e: any): void {
    this.selectedPaymentMethod = e.target.value
  }

  getPaymentMethodName(method: string): string {
    return method.split(/(?=[A-Z])/).join(' ')
  }

  acceptPOTerms(): void {
    this.POTermsAccepted = true
  }

  onStripeCardSuccess(card: StripeIntent): void {
    this.cardSelected.emit(card)
  }

  showNewAddress(): void {
    this.showNewAddressForm = true
    this.selectedBillingAddress = null
    this.suggestedAddresses = []
  }

  addressFormChanged(address: BuyerAddress): void {
    this.selectedBillingAddress = address
  }

  onBillingAddressChange(billingAddressID: string): void {
    this.showNewAddressForm = billingAddressID === this.NEW_ADDRESS_CODE
    this.selectedBillingAddress = this.existingBillingAddresses.Items.find(
      (address) => billingAddressID === address.ID
    )
    const billingAddress = this.existingBillingAddresses.Items.find(
      (address) => address.ID === this.selectedBillingAddress?.ID
    )
    if (billingAddress) {
      this.selectedBillingAddress = billingAddress
    }
  }

  async saveAddressesAndContinue(address: BuyerAddress): Promise<void> {
    await this.context.order.checkout.setOneTimeAddress(
      address as Address,
      'billing'
    )
    await this.saveNewBillingAddress(address)
    this.showNewAddressForm = false
    this.ListAddressesForBilling()
  }

  private async ListAddressesForBilling() {
    const buyerLocationsFilter = {
      filters: { Editable: 'false' },
    }
    const billingAddressesFilter = {
      filters: { Billing: 'true' },
    }
    const [buyerLocations, existingBillingAddresses] = await Promise.all([
      Me.ListAddresses(buyerLocationsFilter),
      HeadStartSDK.Services.ListAll(
        Me,
        Me.ListAddresses,
        billingAddressesFilter
      ),
    ])
    this.homeCountry = buyerLocations?.Items[0]?.Country || 'US'
    this.existingBillingAddresses = existingBillingAddresses
  }

  private async saveNewBillingAddress(
    address: BuyerAddress
  ): Promise<HSAddressBuyer> {
    address.Shipping = false
    address.Billing = true
    try {
      const savedAddress = await this.context.addresses.create(address)
      return savedAddress
    } catch (ex) {
      return this.handleAddressError(ex)
    }
  }

  private handleAddressError(ex: any): null {
    this.suggestedAddresses = getSuggestedAddresses(ex)
    if (!(this.suggestedAddresses?.length >= 1)) throw ex
    return null // set this.selectedShippingAddress
  }
  // used when no selection of card is required
  // only acknowledgement of purchase order is required
  onContinue(): void {
    if (this.selectedBillingAddress) {
      this.context.order.checkout.setOneTimeAddress(
        this.selectedBillingAddress as Address,
        'billing'
      )
      this.continue.emit()
    }
  }
}

import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { StripeConfig } from 'src/app/config/stripe.class'
import { StripeKeyMapDefinition } from 'src/app/models/stripe-types'
import { AppConfig } from 'src/app/models/environment.types'
import { ShopperContextService } from 'src/app/services/shopper-context/shopper-context.service'
import {
  HeadStartSDK,
  HSLineItem,
  HSOrder,
  HSPayment,
  ListPage,
  OrderCloudIntegrationsCreditCardPayment,
  StripePaymentDetails,
} from '@ordercloud/headstart-sdk'
import {
  SelectedCreditCard,
  StripeIntent,
} from 'src/app/models/credit-card.types'
import { OCMCheckout } from '../checkout/checkout.component'
import { Payment } from 'ordercloud-javascript-sdk'
import { AcceptedPaymentTypes } from 'src/app/models/checkout.types'
import { CheckoutService } from 'src/app/services/order/checkout.service'
import { SitecoreSendTrackingService } from 'src/app/services/sitecore-send/sitecore-send-tracking.service'
import { SitecoreCDPTrackingService } from 'src/app/services/sitecore-cdp/sitecore-cdp-tracking.service'
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from 'ngx-spinner'

declare let Stripe: any

@Component({
  selector: 'app-checkout-processing',
  templateUrl: './checkout-processing.component.html',
  styleUrls: ['./checkout-processing.component.scss'],
})
export class CheckoutProcessingComponent implements OnInit {
  order: HSOrder
  publishablekey: string
  stripekeyname: string
  stripecustomernumber: string
  errorMessage: string
  showError = false
  stripeKeyMap = StripeConfig.getStripeKeyMap()
  stripeInfo: StripeKeyMapDefinition
  invalidLineItems: HSLineItem[] = []
  payments: ListPage<Payment>
  selectedCard: SelectedCreditCard
  checkout: CheckoutService = this.context.order.checkout

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appConfig: AppConfig,
    private context: ShopperContextService,
    private toastrService: ToastrService,
    private send: SitecoreSendTrackingService,
    private cdp: SitecoreCDPTrackingService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.spinner.show()
      this.stripekeyname = params['stripekeyname']
      this.stripecustomernumber = params['customerid']
      this.errorMessage = 'Holy Cow!  Better Try Again.'
      this.stripeInfo = this.stripeKeyMap.find(
        (key) => key.StripeKey == this.stripekeyname
      )
      const keyName =
        this.appConfig.sellerName == 'Sitecore LMS TEST'
          ? 'TestPublishableKey'
          : 'ProductionPublishableKey'
      this.publishablekey = this.stripeInfo[keyName]
      this.order = this.context.order.get()
      const stripe = Stripe(this.publishablekey)
      this.checkStatus(stripe, this.order)
    })
  }

  backToCheckout(): void {
    this.router.navigateByUrl('/checkout')
  }

  buildCCPaymentFromNewStripeCard(card: StripeIntent): Payment {
    return {
      DateCreated: new Date().toDateString(),
      Accepted: false,
      Type: 'CreditCard',
      xp: {
        partialAccountNumber: card.id.substr(card.id.length - 4),
        stripePaymentID: card.id,
      },
    }
  }

  getCCPaymentData(): OrderCloudIntegrationsCreditCardPayment {
    return {
      OrderID: this.order.ID,
      PaymentID: this.payments.Items[0].ID, // There's always only one at this point
      CreditCardID: this.selectedCard?.SavedCard?.ID,
      CreditCardDetails: this.selectedCard?.NewCard,
      Currency: this.order.xp.Currency,
      CVV: this.selectedCard?.CVV,
    }
  }

  async submitOrderWithComment(
    comment: string,
    paymentmethodid: string
  ): Promise<void> {
    // Check that line items in cart are all from active products (none were made inactive during checkout).
    this.invalidLineItems = await this.context.order.cart.getInvalidLineItems()
    if (this.invalidLineItems?.length) {
      // Navigate to cart to review invalid items
      await this.context.order.reset() // orderID might've been incremented
      void this.router.navigate(['/cart'])
    } else {
      try {
        const payment: StripePaymentDetails = {
          OrderID: this.order.ID,
          KeyName: this.stripekeyname,
          CustomerID: this.stripecustomernumber,
          PaymentMethodID: paymentmethodid,
        }
        const order = await HeadStartSDK.Orders.Submit(
          'Outgoing',
          this.order.ID,
          payment
        )
        this.send.purchase(this.context.order.getLineItems().Items)
        this.cdp.orderPlaced(
          this.context.order.get(),
          this.context.order.getLineItems().Items
        )
        //  Do all patching of order XP values in the OrderSubmit integration event
        //  Patching order XP before order is submitted will clear out order worksheet data
        await this.checkout.patch({ Comments: comment }, order.ID)
        await this.context.order.reset() // get new current order
        await this.context.order.cart.reset()
        this.toastrService.success('Order submitted successfully', 'Success')
        this.context.router.toMyOrderDetails(order.ID)
      } catch (e) {
        this.errorMessage = 'Error Submitting Order'
        this.showError = true
        this.spinner.hide()
      }
    }
  }

  async onStripeCardSuccess(paymentmethodid: string): Promise<void> {
    const payments: HSPayment[] = []
    const newPayment = await HeadStartSDK.Stripe.GetPayment(
      this.stripekeyname,
      paymentmethodid
    )
    payments.push(newPayment)
    try {
      await HeadStartSDK.Payments.SavePayments(this.order.ID, {
        Payments: payments,
      })
      this.payments = await this.checkout.listPayments()
      // Submit right away
      this.submitOrderWithComment('', paymentmethodid)
    } catch (exception) {
      this.errorMessage = 'Error Processing Payment'
      this.showError = true
      this.spinner.hide()
    }
  }

  // Fetches the payment intent status after payment submission
  async checkStatus(stripe: any, order: HSOrder): Promise<void> {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'setup_intent_client_secret'
    )

    // Retrieve the SetupIntent
    stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
      // Inspect the SetupIntent `status` to indicate the status of the payment
      // to your customer.
      //
      // Some payment methods will [immediately succeed or fail][0] upon
      // confirmation, while others will first enter a `processing` state.
      //
      // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
      switch (setupIntent.status) {
        case 'succeeded': {
          this.errorMessage = 'Success! Your payment method has been saved.'
          this.onStripeCardSuccess(setupIntent.payment_method)
          break
        }

        case 'processing': {
          this.errorMessage =
            "Processing payment details. We'll update you when processing is complete."
          this.checkStatus(stripe, this.order)
          break
        }

        case 'requires_payment_method': {
          this.errorMessage =
            'We could not process your purchase at this time. Please review the information you entered for accuracy and try again.'
          this.showError = true
          this.spinner.hide()

          // Redirect your user back to your payment page to attempt collecting
          // payment again

          break
        }
      }
    })
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { HeadStartSDK, HSOrder } from '@ordercloud/headstart-sdk'
import { BuyerAddress } from 'ordercloud-javascript-sdk'
import { StripeConfig } from 'src/app/config/stripe.class'
import { StripeIntent } from 'src/app/models/credit-card.types'
import { AppConfig } from 'src/app/models/environment.types'
import { ShopperContextService } from 'src/app/services/shopper-context/shopper-context.service'

declare let Stripe: any

@Component({
  selector: 'ocm-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss'],
})
export class StripePaymentComponent implements OnInit {
  order: HSOrder
  @Output() cardSelected = new EventEmitter<StripeIntent>()
  @Input() billingAddressCountry: EventEmitter<BuyerAddress>
  stripeCountries = StripeConfig.getStripeCountries()
  stripeKeyMap = StripeConfig.getStripeKeyMap()

  constructor(
    private context: ShopperContextService,
    private appConfig: AppConfig
  ) {}

  ngOnInit(): void {
    const appURL = this.appConfig.baseUrl
    const keyName =
      this.appConfig.sellerName == 'Sitecore LMS TEST'
        ? 'TestPublishableKey'
        : 'ProductionPublishableKey'
    let stripe
    let zipCode
    let orderCountry
    let elements
    let stripeAccount
    let stripeInfo
    let customerID
    let clientSecret

    async function handleSubmit(e) {
      e.preventDefault()
      const { error } = await stripe.confirmSetup({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: `${appURL}processing/${stripeInfo['StripeKey']}/${customerID}`,
        },
      })

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        debugger
        const messageContainer = document.querySelector('#error-message')
        messageContainer.classList.remove('hidden')
        messageContainer.textContent = error.message

        setTimeout(function () {
          messageContainer.classList.add('hidden')
          messageContainer.textContent = ''
        }, 4000)
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    }

    if (this.billingAddressCountry) {
      this.billingAddressCountry.subscribe(async (data) => {
        if (data) {
          this.order = this.context.order.get()
          stripeAccount = this.stripeCountries.find(
            (country) => country.Code == data.Country
          )
          stripeInfo = this.stripeKeyMap.find(
            (key) => key.StripeAccount == stripeAccount.StripeAccount
          )
          stripe = Stripe(stripeInfo[keyName])
          zipCode = data.Zip
          orderCountry = data.Country
          customerID = await HeadStartSDK.Stripe.StripeCustomerID(
            stripeInfo['StripeKey'],
            this.context.currentUser.get()
          )
          clientSecret = await HeadStartSDK.Stripe.SetupIntent(
            stripeInfo['StripeKey'],
            customerID
          )
          const options = {
            // Fully customizable with appearance API.
            defaultValues: {
              billingDetails: {
                address: {
                  postal_code: zipCode,
                  country: orderCountry,
                },
              },
            },
            clientSecret: clientSecret,
            loader: 'always',
          }

          const element = document.querySelector('#payment-form')
          if (element) {
            element.addEventListener('submit', handleSubmit)
            // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
            elements = stripe.elements(options)

            // Create and mount the Payment Element
            const paymentElement = elements.create('payment')
            paymentElement.mount('#payment-element')
          }
        }
      })
    }
  }

  // ------- UI helpers -------

  showMessageClass(messageText: string): void {
    const messageContainer = document.querySelector('#payment-message')

    messageContainer.classList.remove('hidden')
    messageContainer.textContent = messageText

    setTimeout(function () {
      messageContainer.classList.add('hidden')
      messageContainer.textContent = ''
    }, 4000)
  }

  // Show a spinner on payment submission
  setLoadingClass(isLoading: boolean): void {
    if (isLoading) {
      // Disable the button and show a spinner
      document.querySelector('#submit')['disabled'] = true
      document.querySelector('#spinner').classList.remove('hidden')
      document.querySelector('#button-text').classList.add('hidden')
    } else {
      document.querySelector('#submit')['disabled'] = false
      document.querySelector('#spinner').classList.add('hidden')
      document.querySelector('#button-text').classList.remove('hidden')
    }
  }
}

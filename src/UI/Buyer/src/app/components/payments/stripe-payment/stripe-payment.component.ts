/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { HeadStartSDK, HSOrder } from '@ordercloud/headstart-sdk'
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

  constructor(
    private context: ShopperContextService,
    private appConfig: AppConfig
  ) {}

  ngOnInit(): void {
    this.order = this.context.order.get()
    // This is a publishable key.
    const stripe = Stripe(
      'pk_test_51Ktb9UATia1A62XT9HLOh6lFpkXDVpvX9W9wA9pHtMHVxaNlJsH9Nxeq5nHsEu1Gf515HpgHztSdjKT3mcaCu8eQ003M8ksBlJ'
    )
    let elements
    document
      .querySelector('#payment-form')
      .addEventListener('submit', handleSubmit)

    const stripeBody = {
      Amount: this.order.Total,
      Currency: this.order.Currency || 'USD',
    }

    const url = `${this.appConfig.middlewareUrl}/stripe/create-payment-intent`
    async function initialize(url: string, stripeBody: unknown): Promise<void> {
      const response = await HeadStartSDK.Stripe.CreatePaymentIntent(stripeBody)
      const { clientSecret } = await response

      const appearance = {
        theme: 'stripe',
      }
      elements = stripe.elements({ appearance, clientSecret })

      const paymentElement = elements.create('payment')
      paymentElement.mount('#payment-element')
    }

    // ------- UI helpers -------

    function showMessage(messageText: string): void {
      const messageContainer = document.querySelector('#payment-message')

      messageContainer.classList.remove('hidden')
      messageContainer.textContent = messageText

      setTimeout(function () {
        messageContainer.classList.add('hidden')
        messageContainer.textContent = ''
      }, 4000)
    }

    // Show a spinner on payment submission
    function setLoading(isLoading: boolean): void {
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
    async function handleSubmit(e) {
      e.preventDefault()
      setLoading(true)

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: 'http://localhost:4300/checkout',
        },
      })

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (
        error &&
        (error.type === 'card_error' || error.type === 'validation_error')
      ) {
        showMessage(error.message)
      } else {
        showMessage('An unexpected error occured.')
      }

      setLoading(false)
    }

    initialize(url, stripeBody)
    this.checkStatus(stripe)
  }

  submitStripe(output: StripeIntent): void {
    this.cardSelected.emit(output)
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

  // Fetches the payment intent status after payment submission
  async checkStatus(stripe: any): Promise<void> {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) {
      return
    }

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)

    switch (paymentIntent.status) {
      case 'succeeded':
        this.showMessageClass('Payment succeeded!')
        // Submit the order
        this.submitStripe(paymentIntent)
        break
      case 'processing':
        this.showMessageClass('Your payment is processing.')
        break
      case 'requires_payment_method':
        this.showMessageClass(
          'Your payment was not successful, please try again.'
        )
        break
      default:
        this.showMessageClass('Something went wrong.')
        break
    }
  }
}

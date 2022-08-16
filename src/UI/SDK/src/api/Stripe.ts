import { MeUser, Payment } from 'ordercloud-javascript-sdk';
import { PaymentIntentRequest } from '../models/PaymentIntentRequest';
import { PaymentIntentResponse } from '../models/PaymentIntentResponse';
import { RequiredDeep } from '../models/RequiredDeep';
import httpClient from '../utils/HttpClient';

export default class Stripe {
    private impersonating:boolean = false;

    /**
    * @ignore
    * not part of public api, don't include in generated docs
    */
    constructor() {
        this.CreatePaymentIntent = this.CreatePaymentIntent.bind(this);
    }

   /**
    * @param request PaymentIntentRequest for order.
    * @param accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    */
    public async CreatePaymentIntent(request: PaymentIntentRequest, accessToken?: string ): Promise<RequiredDeep<PaymentIntentResponse>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.post(`/stripe/create-payment-intent`, request, { params: {  accessToken, impersonating } } );
    }

   /**
    * @param keyName The Stripe Key to use
    * @param user The user
    * @param accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    */
    public async StripeCustomerID(keyName: string, user: MeUser, accessToken?: string ): Promise<string> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.post(`/stripe/${keyName}/customerid`, user, { params: {  accessToken, impersonating } } );
    }

   /**
    * @param keyName The Stripe Key to use
    * @param customerID The Stripe CustomerID to use
    * @param accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    */
    public async SetupIntent(keyName: string, customerID: string, accessToken?: string ): Promise<string> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.get(`/stripe/${keyName}/${customerID}/setupintent`, { params: {  accessToken, impersonating } } );
    }

    /**
    * @param keyName The Stripe Key to use
    * @param paymentMethodID The Stripe CustomerID to use
    * @param accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    */
     public async GetPayment(keyName: string, paymentMethodID: string, accessToken?: string ): Promise<Payment> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.get(`/stripe/${keyName}/${paymentMethodID}/payment`, { params: {  accessToken, impersonating } } );
    }

    /**
     * @description
     * enables impersonation by calling the subsequent method with the stored impersonation token
     *
     * @example
     * CreditCards.As().List() // lists CreditCards using the impersonated users' token
     */
    public As(): this {
        this.impersonating = true;
        return this;
    }
}

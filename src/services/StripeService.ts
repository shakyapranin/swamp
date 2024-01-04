import { Stripe, StripeResponse } from "./mocks/Stripe";

export class StripeService {
    stripeClient: Stripe; // HINT: Should this be public?
    constructor(stripeKey: string) {
        this.stripeClient = new Stripe(stripeKey);
    }

    /**
     * Process payment method which will make payment to stripe using Credit Card, Apple Pay, Google Pay etc
     * HINT: Use factory pattern to make it such that payment processing of different payment methods is handling separately
     */
    processPayment(amount: number, paymentMethod: string ): StripeResponse {
        if(paymentMethod === "Apple Pay") {
            return this.stripeClient.processWalletPayment(amount);
        }
        if(paymentMethod === "Credit Card") {
            return this.stripeClient.processCardPayment(amount);
        }
        // HINT: Is it good to use static status code and message here? May be use CONST file with constants instead.
        return {
            statusCode: 500,
            message: "Invalid payment method"
        };
    }
}
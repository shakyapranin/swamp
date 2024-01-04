import { Stripe, StripeResponse } from "./mocks/Stripe";

export class StripeService {
    stripeClient: Stripe; // HINT: Should this be public?
    constructor(stripeClient: Stripe) {
        this.stripeClient = stripeClient;
    }

    /**
     * Process payment method which will make payment to stripe using Credit Card, Apple Pay, Google Pay etc
     * HINT: Use factory pattern to make it such that payment processing of different payment methods is handling separately
     * HINT: Details is left as a type plain object
     */
    processPayment(amount: number, paymentMethod: string, details: Object = {}): StripeResponse {
        if(paymentMethod === "Apple Pay") {
            // HINT: The number arguments have started increase may be have a Request object?
            // HINT: The request object will be needed to be created in multiple cases? May be apply a builder pattern here
            return this.stripeClient.processWalletPayment(amount, details);
        }
        if(paymentMethod === "Credit Card") {
            return this.stripeClient.processCardPayment(amount, details);
        }
        // HINT: Is it good to use static status code and message here? May be use CONST file with constants instead.
        return {
            statusCode: 500,
            message: "Invalid payment method"
        };
    }

    /**
     * Refund payment method which will validate if the payment is present and refunds the payment
     * HINT: Use abstract factory pattern to make it such that payment validation and payment processing is abstracted into a parent class
     * and then elegantly handled by the object returned from the factory
     * @param amount 
     * @param paymentMethod 
     * @returns 
     */
    refundPayment(amount: number, paymentMethod: string): StripeResponse {
        if(paymentMethod === "Apple Pay") {
            if(this.stripeClient.validateWalletPayment(amount)){
                return this.stripeClient.refundWalletPayment(amount);
            }else {
                return {
                    statusCode: 400,
                    message: "Invalid data."
                };
            }
        }
        if(paymentMethod === "Credit Card") {
            if(this.stripeClient.validateCardPayment(amount)){
                return this.stripeClient.refundCardPayment(amount);
            }else {
                return {
                    statusCode: 400,
                    message: "Invalid data."
                };
            }
        }

        return {
            statusCode: 500,
            message: "Invalid payment method"
        };
    }
}
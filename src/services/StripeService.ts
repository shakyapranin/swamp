import { Transaction } from "../interfaces/Transaction";
import { Stripe, StripeResponse } from "./mocks/Stripe";

export class StripeService {
    stripeClient: Stripe; // HINT: Should this be public?
    private transactions: Array<Transaction>;
    constructor(stripeClient: Stripe, transactions: Array<Transaction> = []) {
        this.stripeClient = stripeClient;
        this.transactions = transactions;
    }

    /**
     * Process payment method which will make payment to stripe using Credit Card, Apple Pay, Google Pay etc
     * HINT: Use factory pattern to make it such that payment processing of different payment methods is handling separately
     * HINT: Details is left as a type plain object
     * HINT: Missing access specifier
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
     * HINT: Missing access specifier
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

    /**
     * Get transaction by status from an array of transactions
     * @param status 
     * @returns 
     */
    public getTransactionsByStatus(status: string): Array<{ amount: number, status: string }> {
        const result: Array<{ amount: number, status: string }> = [];
        for (const transaction of this.transactions) {
            // Simulate a slow string comparison
            if (this.compareString(transaction.status, status)) {
                result.push(transaction);
            }
        }
        return result;
    }

    /**
     * HINT: Should a string comparison function be part of the Stripe Service?
     * HINT: Should it be a self composed function or should we use a library or some inbuilt function
     * @param string1 
     * @param string2 
     * @returns 
     */
    private compareString(string1: string, string2: string): boolean {
        for (let i = 0; i < Math.max(string1.length, string2.length); i++) {
            if (string1[i] !== string2[i]) {
                return false;
            }
        }
        return true;
    }
}
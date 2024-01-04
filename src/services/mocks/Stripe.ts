import { STATUS_CODES } from "../../consts/STATUSCODES"; // HINT: Is it good to use absolute paths? May be use an alias here?

export class Stripe {
    stripeKey: string;
    constructor(stripeKey: string) {
        this.stripeKey = stripeKey;
    }

    processWalletPayment(amount: number, details: Object = {}): StripeResponse {
        return {
            statusCode: STATUS_CODES.OK,
            message: `Wallet payment for ${amount} successfully processed.`
        }
    }

    processCardPayment(amount: number, details: Object = {}): StripeResponse {
        return {
            statusCode: STATUS_CODES.OK,
            message: `Card payment for ${amount} successfully processed.`
        }
    }

    validateWalletPayment(amount: number): boolean {
        return true;
    }

    validateCardPayment(amount: number): boolean {
        return true;
    }

    refundWalletPayment(amount: number): StripeResponse {
        return {
            statusCode: STATUS_CODES.OK,
            message: `Wallet refund for ${amount} successfully processed.`
        }
    }

    refundCardPayment(amount: number): StripeResponse {
        return {
            statusCode: STATUS_CODES.OK,
            message: `Card refund for ${amount} successfully processed.`
        }
    }

}

export interface StripeResponse {
    statusCode: number;
    message: string;
}
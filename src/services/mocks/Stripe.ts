import { STATUS_CODES } from "../../consts/STATUSCODES"; // HINT: Is it good to use absolute paths? May be use an alias here?

export class Stripe {
    stripeKey: string;
    constructor(stripeKey: string) {
        this.stripeKey = stripeKey;
    }

    processWalletPayment(amount: number): StripeResponse {
        return {
            statusCode: STATUS_CODES.OK,
            message: `Wallet payment for ${amount} successfully processed.`
        }
    }

    processCardPayment(amount: number): StripeResponse {
        return {
            statusCode: STATUS_CODES.OK,
            message: `Card payment for ${amount} successfully processed.`
        }
    }

}

export interface StripeResponse {
    statusCode: number;
    message: string;
}
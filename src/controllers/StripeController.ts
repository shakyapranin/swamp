import { Request } from "express";
import { StripeService } from "../services/StripeService";
import { Stripe } from "../services/mocks/Stripe";
import StripeRefundRequestBuilder from "../builders/StripeRefundRequestBuilder";
import InvalidDataException from "../exceptions/InvalidDataException";
import { STATUS_CODES } from "../consts/STATUSCODES";

export class StripeController {
    private stripeService: StripeService;
    constructor(stripeKey: string) {
        this.stripeService = new StripeService(new Stripe('testStripeKey'));
    }

    /**
     * Refund payment request
     * @param request 
     * @returns 
     */
    public refund(request: Request) {
        const amount = request.body.amount;
        const paymentMethod = request.body.paymentMethod;
        const details = request.body.details;

        const stripeRefundRequest = new StripeRefundRequestBuilder(amount, paymentMethod)
            .setDetails(details)
            .build();
        try {
            // HINT: Would it be better to have refundPayment accept a single instance of stripeRefundRequest
            // INFO: It is always good to have least arguments in a function i.e. mostly a bundled argument object
            const response = this.stripeService.refundPayment(
                stripeRefundRequest.amount,
                stripeRefundRequest.paymentMethod
            );
            // INFO: Notice how response is constructed in the controller regardless of the external response
            return {
                statusCode: STATUS_CODES.OK,
                message: response.message,
                data: response
            }
        }catch (error) {
            if(error instanceof InvalidDataException) {
                // INFO: Constructing application specific error message is healthy so as to only show meaning message.
                // INFO: Returning direct response from third party service may result in data breach
                return {
                    statusCode: STATUS_CODES.BAD_REQUEST,
                    message: error.message
                };
            }
        }
    }
}
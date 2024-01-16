import { Request, Response } from "express";
import { STATUS_CODES } from "../consts/STATUSCODES";
import SwampResponse from "../interfaces/SwampResponse";
import PaymentStrategyRegistry from "../services/PaymentStrategyRegistry";

export class PaymentController {
    private strategyRegistry: PaymentStrategyRegistry;

    constructor(strategyRegistry: PaymentStrategyRegistry) {
        this.strategyRegistry = strategyRegistry;
    }

    /**
     * Make payment
     * @param req 
     * @param res 
     * @returns 
     */
    public pay(req: Request, res: Response): SwampResponse {
        const gatewayType = req.body.gatewayType; // HINT: Should the request payload be camelCased or snake_cased?
        const strategy = this.strategyRegistry.getStrategy(gatewayType);

        if (!strategy) {
            return {
                statusCode: STATUS_CODES.BAD_REQUEST,
                message: "Unsupported gateway type.",
            };
        }
        const amount = req.body.amount;
        const details = req.body.details;
        const paymentMethod = req.body.paymentMethod || null;
        return strategy.processPayment(amount, paymentMethod, details);
    }

    /**
     * Refund payment
     * HINT: Notice how getting right strategy as gateway type is repeated. Apply DRY principle here.
     * HINT: Private functions are good way to maintain DRY principle and maintain encapsulation inside a class.
     * @param req 
     * @param res 
     * @returns 
     */
    public refund(req: Request, res: Response): SwampResponse {
        const gatewayType = req.body.gatewayType;
        const strategy = this.strategyRegistry.getStrategy(gatewayType);
        if (!strategy) {
            return {
                statusCode: STATUS_CODES.BAD_REQUEST,
                message: "Unsupported gateway type.",
            };
        }
        const amount = req.body.amount;
        const details = req.body.details;
        const paymentMethod = req.body.paymentMethod || null;
        return strategy.refundPayment(amount, paymentMethod);
    }
}
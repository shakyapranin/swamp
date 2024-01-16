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
                message: "Unsupported payment method",
            };
        }
        const amount = req.body.amount;
        const details = req.body.details;
        const paymentMethod = req.body.paymentMethod || null;
        return strategy.processPayment(amount, paymentMethod, details);
    }
}
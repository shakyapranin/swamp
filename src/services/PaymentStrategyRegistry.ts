import PaymentProcessorInterface from "../interfaces/PaymentProcessorInterface";
import CashAdapterService from "./CashAdapterService";
import { StripeService } from "./StripeService";
import { CashPaymentProcessor } from "./mocks/CashPaymentProcessor";
import { Stripe } from "./mocks/Stripe";

export const REGISTRY_KEY = {
  STRIPE: "stripe",
  CASH: "cash",
};

export default class PaymentStrategyRegistry {
  private strategies: Record<string, PaymentProcessorInterface> = {};

  constructor() {
    // Register payment strategies
    // HINT: Make it such that these payment strategies fulfill the PaymentProcessorInterface contract
    // INFO: Notice how StripeService doesn't implement PaymentProcessorInterface but is a valid strategy
    // HINT: Make it such that StripeService implements PaymentProcessorInterface
    this.registerStrategy(
      REGISTRY_KEY.STRIPE,
      new StripeService(new Stripe("testStripeKey")),
    );
    this.registerStrategy(
      REGISTRY_KEY.CASH,
      new CashAdapterService(new CashPaymentProcessor()),
    );
  }

  /**
   *
   * @param gatewayType
   * @param strategy
   */
  private registerStrategy(
    gatewayType: string,
    strategy: PaymentProcessorInterface,
  ): void {
    this.strategies[gatewayType] = strategy;
  }

  /**
   * Get appropriate strategy as per payment method type
   * @param gatewayType
   * @returns
   */
  public getStrategy(
    gatewayType: string,
  ): PaymentProcessorInterface | undefined {
    return this.strategies[gatewayType];
  }
}

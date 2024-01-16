import StripeRefundRequest from "../requests/StripeRefundRequest";

export default class StripeRefundRequestBuilder {
  private _amount: number; // INFO: Notice how the attribute is set to private
  private _paymentMethod: string; // INFO: Notice how name of private variable name is starting with _something
  private _details: string; // INFO: Notice how there is an accessor for these private variables
  constructor(amount: number, paymentMethod: string, details: string = "") {
    this._amount = amount;
    this._paymentMethod = paymentMethod;
    // INFO: Notice that details has a default value, useful when something is optional during initialization
    this._details = details; // INFO: Also notice how a setter is available in case something needs to be set after object initialization
  }

  // INFO: Notice how amount and paymentMethod have getters but no setters.
  // This is because logically amount and paymentMethod can be something that cannot be changed outside of constructor
  public get amount(): number {
    return this._amount;
  }

  public get paymentMethod(): string {
    return this._paymentMethod;
  }

  public get details(): string {
    return this._details;
  }

  /**
   * Set details
   * @param details
   * @returns
   */
  setDetails(details: string): StripeRefundRequestBuilder {
    this._details = details;
    return this;
  }

  build(): StripeRefundRequest {
    return new StripeRefundRequest(this);
  }
}

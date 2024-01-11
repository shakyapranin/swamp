import StripeRefundRequestBuilder from "../builders/StripeRefundRequestBuilder";

export default class StripeRefundRequest {
    private _amount: number;
    private _paymentMethod: string;
    private _details: string;
    private _someStripePrivateInformation: string; // INFO: Notice how this doesn't have an get function

    /**
     * INFO: A builder class will standardize how a request object is created accross the application
     * @param builder 
     */
    constructor(builder: StripeRefundRequestBuilder) {
        this._amount = builder.amount;
        this._paymentMethod = builder.paymentMethod;
        this._details = builder.details;
        this._someStripePrivateInformation = "Something other shouldn't have access to";
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
}
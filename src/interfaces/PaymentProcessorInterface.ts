export default interface PaymentProcessorInterface {
    processPayment(
        amount: number,
        paymentMethod: String,
        details: Object
    ): PaymentProcessorResponse;
    refundPayment(
        amount: number,
        paymentMethod: String
    ): PaymentProcessorResponse;
    getTransactionsByStatus(status: string): PaymentProcessorResponse;
}

export interface PaymentProcessorResponse {
    statusCode: number;
    message: string;
    data?: any;
}
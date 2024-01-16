export default interface PaymentProcessorInterface {
  processPayment(
    amount: number,
    paymentMethod: string,
    details: object,
  ): PaymentProcessorResponse;
  refundPayment(
    amount: number,
    paymentMethod: string,
  ): PaymentProcessorResponse;
  getTransactionsByStatus(status: string): PaymentProcessorResponse;
}

export interface PaymentProcessorResponse {
  statusCode: number;
  message: string;
  data?: object;
}

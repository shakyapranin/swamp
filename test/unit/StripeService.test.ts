import { STATUS_CODES } from "../../src/consts/STATUSCODES";
import { TRANSACTION_STATUS } from "../../src/consts/TRANSACTION_STATUS";
import InvalidDataException from "../../src/exceptions/InvalidDataException";
import { StripeService } from "../../src/services/StripeService";
import { Stripe } from "../../src/services/mocks/Stripe";

describe('processPayment', () => {
  // Create an instance of StripeService for testing
  let stripeService: StripeService;

  beforeEach(() => {
    // Initialize the StripeService before each test case
    stripeService = new StripeService(new Stripe("stripe_key"));
  });

  it("should process payment using Apple Pay", () => {
    const amount = 100;
    const paymentMethod = "Apple Pay";

    // Call the processPayment method and capture the response
    const response = stripeService.processPayment(amount, paymentMethod);

    // Assert that the response is as expected
    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(response.message).toBe(`Wallet payment for ${amount} successfully processed.`);
  });

  it("should process payment using Credit Card", () => {
    const amount = 200;
    const paymentMethod = "Credit Card";

    // Call the processPayment method and capture the response
    const response = stripeService.processPayment(amount, paymentMethod);

    // Assert that the response is as expected
    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(response.message).toBe(`Card payment for ${amount} successfully processed.`);
  });

  it("should return an error for an invalid payment method", () => {
    const amount = 300;
    const paymentMethod = "Invalid Method";

    // Call the processPayment method and capture the response
    const response = stripeService.processPayment(amount, paymentMethod);

    // Assert that the response is as expected
    expect(response.statusCode).toBe(STATUS_CODES.SERVER_ERROR);
    expect(response.message).toBe("Invalid payment method");
  });
});

describe('refundPayment', () => {
  // Create an instance of StripeService for testing
  let stripeService: StripeService;

  beforeEach(() => {
    // Initialize the StripeService before each test case
    stripeService = new StripeService(new Stripe("stripe_key"));
  });

  it("should refund payment for valid Apple Pay payment", () => {
    const amount = 100;
    const paymentMethod = "Apple Pay";

    const response = stripeService.refundPayment(amount, paymentMethod);

    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(response.message).toBe("Wallet refund for 100 successfully processed.");
  });

  it("should refund payment for valid Credit Card payment", () => {
    const amount = 200;
    const paymentMethod = "Credit Card";

    const response = stripeService.refundPayment(amount, paymentMethod);

    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(response.message).toBe("Card refund for 200 successfully processed.");
  });

  it("should return invalid data for Credit card", () => {
    const amount = 400;
    const paymentMethod = "Credit Card";

    // Mock validatePayment method to return false and test for error
    // TODO: Fix this to use mock instead of function override
    stripeService.stripeClient.validateCardPayment = () => false;

    expect(() => stripeService.refundPayment(amount, paymentMethod))
    .toThrow(InvalidDataException);
  });

  it("should return error for invalid payment method", () => {
    const amount = 300;
    const paymentMethod = "Invalid Method";

    const response = stripeService.refundPayment(amount, paymentMethod);

    expect(response.statusCode).toBe(500);
    expect(response.message).toBe("Invalid payment method");
  });
});

describe('getTransactionsByStatus', () => {

  it('should return an empty array if no transactions match the status', () => {
    const mockTransactions = [
      { amount: 100, status: TRANSACTION_STATUS.SUCCESS },
      { amount: 200, status: TRANSACTION_STATUS.SUCCESS },
      { amount: 300, status: TRANSACTION_STATUS.FAILURE },
    ];
    const stripeService = new StripeService(new Stripe("stripe_key"), mockTransactions);
    const result = stripeService.getTransactionsByStatus('pending');

    expect(result).toEqual([]);
  });

  it('should return an array of transactions that match the status', () => {
    const mockTransactions = [
      { amount: 100, status: TRANSACTION_STATUS.SUCCESS },
      { amount: 200, status: TRANSACTION_STATUS.PENDING },
      { amount: 300, status: TRANSACTION_STATUS.SUCCESS },
    ];
    const stripeService = new StripeService(new Stripe("stripe_key"), mockTransactions);
    const result = stripeService.getTransactionsByStatus('success');

    expect(result).toEqual([
      { amount: 100, status: TRANSACTION_STATUS.SUCCESS },
      { amount: 300, status: TRANSACTION_STATUS.SUCCESS },
    ]);
  });
});


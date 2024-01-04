import { STATUS_CODES } from "../../src/consts/STATUSCODES";
import { StripeService } from "../../src/services/StripeService";

describe("StripeService", () => {
  // Create an instance of StripeService for testing
  let stripeService: StripeService;

  beforeEach(() => {
    // Initialize the StripeService before each test case
    stripeService = new StripeService("stripe_key");
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

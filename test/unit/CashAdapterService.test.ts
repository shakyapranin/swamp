import { MOCK_TRANSACTIONS } from "../../src/consts/MOCKS";
import CashAdapterService from "../../src/services/CashAdapterService";
import { CashPaymentProcessor } from "../../src/services/mocks/CashPaymentProcessor";

describe("CashAdapterService", () => {
  let cashAdapterService: CashAdapterService;
  let cashPaymentProcessor: CashPaymentProcessor;

  beforeEach(() => {
    cashPaymentProcessor = new CashPaymentProcessor();
    cashAdapterService = new CashAdapterService(
      cashPaymentProcessor,
      MOCK_TRANSACTIONS,
    );
  });

  describe("processPayment", () => {
    it("should return a successful payment response", () => {
      const amount = 100;
      const paymentMethod = "cash";
      const details = {};

      const response = cashAdapterService.processPayment(
        amount,
        paymentMethod,
        details,
      );

      expect(response.statusCode).toBe(200);
      expect(response.message).toBe("Cash payment successful.");
      expect(response.data).toBeDefined();
    });

    it("should return a server error response if payment fails", () => {
      const amount = 100;
      const paymentMethod = "cash";
      const details = {};

      // Mocking the cashPaymentProcessor.payCash method to throw an error
      cashPaymentProcessor.payCash = jest.fn(() => {
        throw new Error("Payment failed");
      });

      const response = cashAdapterService.processPayment(
        amount,
        paymentMethod,
        details,
      );

      expect(response.statusCode).toBe(500);
      expect(response.message).toBe("Payment failed");
      expect(response.data).toBeUndefined();
    });
  });

  describe("refundPayment", () => {
    it("should return a successful refund response", () => {
      const amount = 100;
      const paymentMethod = "cash";

      const response = cashAdapterService.refundPayment(amount, paymentMethod);

      expect(response.statusCode).toBe(200);
      expect(response.message).toBe("Cash refund successful.");
      expect(response.data).toBeDefined();
    });

    it("should return a server error response if refund fails", () => {
      const amount = 100;
      const paymentMethod = "cash";

      // Mocking the cashPaymentProcessor.refundCash method to throw an error
      cashPaymentProcessor.refundCash = jest.fn(() => {
        throw new Error("Refund failed");
      });

      const response = cashAdapterService.refundPayment(amount, paymentMethod);

      expect(response.statusCode).toBe(500);
      expect(response.message).toBe("Refund failed");
      expect(response.data).toBeUndefined();
    });
  });

  describe("getTransactionsByStatus", () => {
    it("should return transactions with the given status", () => {
      const status = "success";

      const response = cashAdapterService.getTransactionsByStatus(status);

      expect(response.statusCode).toBe(200);
      expect(response.message).toBe("Transactions were successfully fetched.");
      expect(response.data).toEqual(
        expect.arrayContaining([
          { amount: expect.any(Number), status: status },
        ]),
      );
    });

    it("should return an empty array if there are no transactions", () => {
      const status = "success";
      cashPaymentProcessor = new CashPaymentProcessor();
      cashAdapterService = new CashAdapterService(cashPaymentProcessor, []);
      // Mocking the cashPaymentProcessor.getTransactions method to return an empty array
      cashPaymentProcessor.getTransactions = jest.fn(() => []);

      const response = cashAdapterService.getTransactionsByStatus(status);

      expect(response.statusCode).toBe(200);
      expect(response.message).toBe("Transactions were successfully fetched.");
      expect(response.data).toEqual([]);
    });
  });
});

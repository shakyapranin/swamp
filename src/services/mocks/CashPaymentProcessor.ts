import { MOCK_TRANSACTIONS } from "../../consts/MOCKS";
import { Transaction } from "../../interfaces/Transaction";

export class CashPaymentProcessor {
  payCash(amount: number): number {
    return amount;
  }
  refundCash(amount: number): number {
    if (amount < 0) {
      throw new Error("Amount must be greater than zero");
    }
    return amount;
  }
  validatePayment(_amount: number): boolean {
    return true;
  }
  getTransactions(): Array<Transaction> {
    return MOCK_TRANSACTIONS;
  }
}

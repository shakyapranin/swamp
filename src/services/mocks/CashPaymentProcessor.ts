import { MOCK_TRANSACTIONS } from "../../consts/MOCKS";
import { Transaction } from "../../interfaces/Transaction";

export class CashPaymentProcessor {
    payCash(amount: number): number {
        return amount;
    }
    refundCash(amount: number): number {
        return amount;
    }
    validatePayment(_amount: number): boolean {
        return true;
    }
    getTransactions(): Array<Transaction> {
        return MOCK_TRANSACTIONS;
    }
}
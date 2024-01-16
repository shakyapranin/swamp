import { STATUS_CODES } from "../consts/STATUSCODES";
import PaymentProcessorInterface, { PaymentProcessorResponse } from "../interfaces/PaymentProcessorInterface";
import { Transaction } from "../interfaces/Transaction";
import { compareString } from "../utils/string";
import { CashPaymentProcessor } from "./mocks/CashPaymentProcessor";

// INFO: Notice in the class below PaymentProcessorInterface helps to standardize method signature and even return types
export default class CashAdapterService implements PaymentProcessorInterface {
    private cashPaymentProcessor: CashPaymentProcessor;
    private transactions: Array<Transaction>;

    constructor(cashPaymentProcessor: CashPaymentProcessor, transactions: Array<Transaction> = []) {
        this.cashPaymentProcessor = cashPaymentProcessor;
        this.transactions = transactions;
    }

    /**
     * HINT: May be this method should throw an exception rathen than constructing a Response
     * INFO: Notice how processPayment complies the PaymentProcessorInterface contract and acts as a proxy to cash service which is 
     * incompatible directly with PaymentProcessorInterface
     * @param amount 
     * @param _paymentMethod 
     * @param details 
     * @returns 
     */
    processPayment(amount: number, _paymentMethod: String = 'cash', details: Object): PaymentProcessorResponse {
        try {
            const response = this.cashPaymentProcessor.payCash(amount);
            return {
                statusCode: STATUS_CODES.OK,
                message: "Cash payment successful.",
                data: response
            }
        }catch (error: any) {
            return {
                statusCode: STATUS_CODES.SERVER_ERROR,
                message: error.message
            };
        }
    }

    /**
     * INFO: Notice how refundPayment complies the PaymentProcessorInterface contract and acts as a proxy to cash service which is 
     * incompatible directly with PaymentProcessorInterface
     * @param amount 
     * @param _paymentMethod 
     * @returns 
     */
    refundPayment(amount: number, _paymentMethod: String = 'cash'): PaymentProcessorResponse {
        try {
            const response = this.cashPaymentProcessor.refundCash(amount);
            return {
                statusCode: STATUS_CODES.OK,
                message: "Cash refund successful.",
                data: response
            }
        }catch (error: any) {
            return {
                statusCode: STATUS_CODES.SERVER_ERROR,
                message: error.message
            };
        }
    }

    /**
     * 
     * @param status 
     * @returns 
     */
    getTransactionsByStatus(status: string): PaymentProcessorResponse {
        const result: Array<{ amount: number, status: string }> = [];
        if (this.transactions.length < 0) this.transactions = this.cashPaymentProcessor.getTransactions();
        for (const transaction of this.transactions) {
            // INFO: Notice how compareString is used from the Util.ts
            if (compareString(transaction.status, status)) {
                result.push(transaction);
            }
        }
        return {
            statusCode: STATUS_CODES.OK,
            message: "Transactions were successfully fetched.",
            data: result
        };
    }
}
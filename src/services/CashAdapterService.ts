import { STATUS_CODES } from "../consts/STATUSCODES";
import RefundEvent from "../emitters/Event";
import { EmailFacade } from "../facades/EmailFacade";
import PaymentProcessorInterface, {
  PaymentProcessorResponse,
} from "../interfaces/PaymentProcessorInterface";
import { Transaction } from "../interfaces/Transaction";
import RefundObserver from "../observers/RefundObserver";
import { compareString } from "../utils/string";
import { CashPaymentProcessor } from "./mocks/CashPaymentProcessor";

// INFO: Notice in the class below PaymentProcessorInterface helps to standardize method signature and even return types
export default class CashAdapterService implements PaymentProcessorInterface {
  private cashPaymentProcessor: CashPaymentProcessor;
  private transactions: Array<Transaction>;
  refundObserver: RefundObserver;
  refundEvent: RefundEvent;

  constructor(
    cashPaymentProcessor: CashPaymentProcessor,
    transactions: Array<Transaction> = [],
  ) {
    this.cashPaymentProcessor = cashPaymentProcessor;
    this.transactions = transactions;

    // HINT: Would be better to initialize event listeners else where
    // INFO: Usually Event observers are configured by Frameworks when bootstrapping
    this.refundEvent = new RefundEvent();
    this.refundObserver = new RefundObserver();
    this.refundEvent.subscribe(this.refundObserver); // INFO: Subscribe RefundObserver to listen to listen for refund events
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
  processPayment(
    amount: number,
    _paymentMethod: string = "cash",
    details: object,
  ): PaymentProcessorResponse {
    try {
      const responseAmount = this.cashPaymentProcessor.payCash(amount);
      const emailFacade = EmailFacade.getInstance(); // INFO: Notice how a static method is used to access a singleton object
      const emailContent = {
        subject: "Cash Payment Successful.",
        body: `Cash payment of ${amount} is made successfully.`,
        to: "someone@somemail.com",
      };
      const emailResponse = emailFacade.sendEmail(emailContent);
      if (!emailResponse) {
        // HINT: May be implement a logger service to log for errors.
        console.log("Unable to send email.");
      }
      return {
        statusCode: STATUS_CODES.OK,
        message: "Cash payment successful.",
        data: {
          amount: responseAmount,
        },
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          statusCode: STATUS_CODES.SERVER_ERROR,
          message: error.message,
        };
      }
      return {
        statusCode: STATUS_CODES.SERVER_ERROR,
        message: "Internal Server Error.",
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
  refundPayment(
    amount: number,
    _paymentMethod: string = "cash",
  ): PaymentProcessorResponse {
    try {
      const responseAmount = this.cashPaymentProcessor.refundCash(amount);
      this.refundEvent.notify({ type: "refundProcessed", amount });
      return {
        statusCode: STATUS_CODES.OK,
        message: "Cash refund successful.",
        data: {
          amount: responseAmount,
        },
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          statusCode: STATUS_CODES.SERVER_ERROR,
          message: error.message,
        };
      }
      return {
        statusCode: STATUS_CODES.SERVER_ERROR,
        message: "Internal Server Error.",
      };
    }
  }

  /**
   *
   * @param status
   * @returns
   */
  getTransactionsByStatus(status: string): PaymentProcessorResponse {
    const result: Array<{ amount: number; status: string }> = [];
    if (this.transactions.length < 0)
      this.transactions = this.cashPaymentProcessor.getTransactions();
    for (const transaction of this.transactions) {
      // INFO: Notice how compareString is used from the Util.ts
      if (compareString(transaction.status, status)) {
        result.push(transaction);
      }
    }
    return {
      statusCode: STATUS_CODES.OK,
      message: "Transactions were successfully fetched.",
      data: result,
    };
  }
}

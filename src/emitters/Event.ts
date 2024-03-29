import { PaymentData } from "../interfaces/EventData";
import EventEmitter from "./EventEmitter";

export default class RefundEvent extends EventEmitter {}

export class PaymentEvent extends EventEmitter {
  // INFO: It is beneficial to override base notify function to add additional functionality
  notify(data: PaymentData): void {
    super.notify(data);
    console.log(`PaymentEvent notification done.`);
  }
}

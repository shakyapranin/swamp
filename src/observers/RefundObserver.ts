import { EmailFacade } from "../facades/EmailFacade";
import { RefundData } from "../interfaces/EventData";
import { Observer } from "../interfaces/Observer";

export default class RefundObserver implements Observer {
  /**
   * HINT: Notice how data is just left as a plain object, better to use an interface/type here
   * Observe for refund success event and do updates
   * @param data
   */
  update(data: RefundData): void {
    const emailFacade = EmailFacade.getInstance(); // INFO: Notice how a static method is used to access a singleton object
    const emailContent = {
      subject: "Refund Successful.",
      body: `Refund of ${data.amount} is made successfully.`,
      to: "someone@somemail.com",
    };
    const emailResponse = emailFacade.sendEmail(emailContent);
    if (!emailResponse) {
      // HINT: May be implement a logger service to log for errors.
      console.log("Unable to send email.");
    }
  }
}

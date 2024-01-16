import { EmailFacade } from "../../src/facades/EmailFacade";
import Email from "../../src/interfaces/Email";

describe("EmailFacade", () => {
    let emailFacade: EmailFacade;
  
    beforeEach(() => {
      emailFacade = EmailFacade.getInstance();
    });
  
    it("should send an email successfully", () => {
      const email: Email = {
        subject: "Test Subject",
        body: "Test Body",
        to: "test@example.com"
      };
  
      const result = emailFacade.sendEmail(email);
  
      expect(result).toBe(true);
    });
  
    // Add more test cases for different scenarios
  
  });
  
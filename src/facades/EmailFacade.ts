import Email from "../interfaces/Email";

// Subsystem for composing emails
class EmailComposer {
    compose(email: Email): string {
        return `Subject: ${email.subject}\nBody: ${email.body}`;
    }
}

// Subsystem for sending emails
class EmailSender {
    send(emailContent: string, to: string): boolean {
        console.log(`Sending email to ${to}:\n${emailContent}`);
        return true;
    }
}

/**
 * INFO: Notice how this facade is made singleton
 */
export class EmailFacade {
    private composer: EmailComposer;
    private sender: EmailSender;
    private static instance: EmailFacade;

    private constructor() {
        this.composer = new EmailComposer();
        this.sender = new EmailSender();
    }

    /**
     * INFO: This function will only initialize the instance using private constructor once and will return 
     * existing instance whenever a request is made
     * @returns 
     */
    public static getInstance(): EmailFacade {
        if(!EmailFacade.instance) {
            EmailFacade.instance = new EmailFacade();
        }
        return EmailFacade.instance;
    }

    /**
     * INFO: Notice how the email composer and email sender implementation are hidden behind a Facade implementation.
     * @param email 
     * @returns 
     */
    sendEmail(email: Email): boolean {
        const emailContent = this.composer.compose(email);
        return this.sender.send(emailContent, email.to);
    }
}
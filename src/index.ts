import { StripeService } from "./services/StripeService";
import express, { Request, Response } from "express";
import { Stripe } from "./services/mocks/Stripe";
import { StripeController } from "./controllers/StripeController";
const PORT = 9000; // HINT: Should this value be an environment variable?

const app = express();
const stripeService = new StripeService(new Stripe('testStripeKey')); // HINT: Should the stripe key be static here? May be an environment variable should be used.

app.use(express.json());

// HINT: Should these be separated into routes? routes only for Stripe ('/stripe/something') and Later on for different domains too
// HINT: Should there be a controller to be leveraged within this callback rather than everything in the index file itself
app.post('/stripe/payment', (req: Request, res: Response) => {
    const amount = req.body.amount; // HINT: Should the parameters be validated first before access? May be use a request validator
    const paymentMethod = req.body.paymentMethod; // HINT: Should the parameters be validated first before access? May be use a request validator
    return res.json(stripeService.processPayment(parseInt(amount), paymentMethod)); // HINT: Should parsing of string to integer be done here? May be use a request validator as middleware to parse?
});

// HINT: Should the routes being an API have prefix? '/api/'
// HINT: Should there be versioning? '/api/v1/stripe'
app.post('/stripe/refund', (req: Request, res: Response) => {
    // INFO: Notice how _req.body.amount would've been needed here if it were not for controllers and request builders which also helps with DRY principle
    const stripeController = new StripeController('testStripeKey'); // INFO: Notice how introduction of a controller is better than initializing a service in the index.ts itself
    return res.json(stripeController.refund(req));
});


// HINT: Should the PORT variable be used here after it has been converted into an environment variable?
app.listen(9000, () => {
    console.log(`Application listening on ${PORT}`);
});
import { StripeService } from "./services/StripeService";
import express, { Request, Response } from "express";
const PORT = 9000; // HINT: Should this value be an environment variable?

const app = express();
const stripeService = new StripeService('testStripeKey'); // HINT: Should the stripe key be static here? May be an environment variable should be used.

app.use(express.json());
app.post('/stripe/payment', (_req: Request, res: Response) => {
    const amount = _req.body.amount; // HINT: Should the parameters be validated first before access? May be use a request validator
    const paymentMethod = _req.body.paymentMethod; // HINT: Should the parameters be validated first before access? May be use a request validator
    return res.json(stripeService.processPayment(parseInt(amount), paymentMethod)); // HINT: Should parsing of string to integer be done here? May be use a request validator as middleware to parse?
});

// HINT: Should the PORT variable be used here after it has been converted into an environment variable?
app.listen(9000, () => {
    console.log(`Application listening on ${PORT}`);
});
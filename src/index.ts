import { StripeService } from "./services/StripeService";
import express, { Request } from "express";

const app = express();
const stripeService = new StripeService('testStripeKey'); // HINT: Should the stripe key be static here? May be an environment variable should be used.

app.post('/stripe/payment', (_req: Request) => {
    const amount = _req.params.amount; // HINT: Should the parameters be validated first before access? May be use a request validator
    const paymentMethod = _req.params.paymentMehod; // HINT: Should the parameters be validated first before access? May be use a request validator
    return stripeService.processPayment(parseInt(amount), paymentMethod); // HINT: Should parsing of string to integer be done here? May be use a request validator as middleware to parse?
});
import express from "express";

const customerRouter = express.Router();

customerRouter.get("/", (_req, res) => {
  res.json({
    statusCode: 200,
    data: [],
  });
});

export default customerRouter;

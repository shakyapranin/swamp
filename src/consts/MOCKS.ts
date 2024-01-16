import { TRANSACTION_STATUS } from "./TRANSACTION_STATUS";

export const MOCK_TRANSACTIONS = [
  { amount: 100, status: TRANSACTION_STATUS.SUCCESS },
  { amount: 200, status: TRANSACTION_STATUS.PENDING },
  { amount: 300, status: TRANSACTION_STATUS.SUCCESS },
];

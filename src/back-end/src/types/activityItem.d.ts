export type ActivityItem = {
  id: string;
  type: 'USER_REGISTERED' | 'TRANSACTION_CREATED';
  timestamp: string;
  userName?: string;
  transactionDescription?: string;
  transactionAmount?: number;
  transactionType?: 'income' | 'expense';
};
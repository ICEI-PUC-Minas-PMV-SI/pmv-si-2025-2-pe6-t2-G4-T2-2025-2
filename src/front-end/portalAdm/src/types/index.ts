export type ActivityItem = {
  id: string; // ID do evento ou do recurso relacionado
  type: 'USER_REGISTERED' | 'TRANSACTION_CREATED'; // Tipo de evento
  timestamp: string; // Data/Hora do evento (ISO string)
  userName?: string; // Nome do usuário (se aplicável)
  transactionDescription?: string; // Descrição da transação (se aplicável)
  transactionAmount?: number; // Valor da transação (se aplicável)
  transactionType?: 'income' | 'expense'; // Tipo da transação
};
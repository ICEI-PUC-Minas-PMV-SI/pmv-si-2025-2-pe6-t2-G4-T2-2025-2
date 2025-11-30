import { useState, useCallback } from "react";
import { api } from "../services/api";
import { TransactionCardProps } from "../components/TransactionCard";

interface FinancialSummary {
  income: number;
  expense: number;
  balance: number;
}

interface WeeklyReportItem {
  week: string;
  income: number;
  expense: number;
}

export function useDashboardData() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados de Dados
  const [summary, setSummary] = useState<FinancialSummary>({ income: 0, expense: 0, balance: 0 });
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<TransactionCardProps[]>([]);

  // Função de Busca Principal
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      setWeeklyData([]); 

      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      // Chamadas em Paralelo
      const [summaryResponse, transactionsResponse, weeklyResponse] = await Promise.all([
        api.get(`/reports/summary`, { params: { month, year } }),
        api.get(`/transactions`, { params: { month, year, page: 1, perPage: 5 } }),
        api.get<WeeklyReportItem[]>('/reports/weeklyReport', { params: { month, year } })
      ]);

      // Summary
      const incomeVal = Number(summaryResponse.data?.totalIncomes ?? 0);
      const expenseVal = Number(summaryResponse.data?.totalExpense ?? 0);
      
      setSummary({
        income: incomeVal,
        expense: expenseVal,
        balance: incomeVal - expenseVal
      });

      // Transações
      const formattedTransactions = transactionsResponse.data.transactions.map((item: any) => ({
        id: item.id,
        description: item.description,
        amount: Number(item.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
        type: item.type,
        category: item.category?.name || "Sem Categoria",
        date: new Date(item.date).toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit' })
      }));
      setRecentTransactions(formattedTransactions);

      // Gráfico Semanal
      const rawWeeklyData = weeklyResponse.data || [];
      
      if (rawWeeklyData.length === 0) {
         setWeeklyData([{ value: 0, label: 'Sem dados' }]);
      } else {
         const chartFormattedData: any[] = [];
         rawWeeklyData.forEach((weekItem) => {
            chartFormattedData.push({
                value: Number(weekItem.income),
                label: weekItem.week,
                spacing: 2,
                labelWidth: 30,
                labelTextStyle: { color: 'gray', fontSize: 10 },
                frontColor: '#c0fd2b',
            });
            chartFormattedData.push({
                value: Number(weekItem.expense),
                frontColor: '#ef4444',
            });
         });
         setWeeklyData(chartFormattedData);
      }

    } catch (error) {
      console.log("Erro ao buscar dados do dashboard", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentDate]);

  // Handlers
  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Valores Formatados para View
  const formattedSummary = {
    balance: summary.balance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    income: summary.income.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    expense: summary.expense.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  };

  return {
    // Estados
    isLoading,
    currentDate,
    summary: formattedSummary,
    recentTransactions,
    weeklyData,
    fetchData,
    handlePrevMonth,
    handleNextMonth
  };
}
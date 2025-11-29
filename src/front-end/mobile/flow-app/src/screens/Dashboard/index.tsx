import { useState, useEffect, useCallback } from "react";
import { View, ScrollView, RefreshControl, Alert } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { api } from "../../services/api";

// Componentes
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardMenu } from "./components/DashboardMenu";
import { TabSelector } from "./components/TabSelector";
import { OverviewTab } from "./components/OverviewTab";
import { CategoriesTab } from "./components/CategoriesTab";
import { MonthSelector } from "./components/MonthSelector"
import { TransactionCardProps } from "@/components/TransactionCard";

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

export function Dashboard() {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState<"overview" | "categories">("overview");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const [summary, setSummary] = useState<FinancialSummary>({ income: 0, expense: 0, balance: 0 });
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<TransactionCardProps[]>([])

  // --- LÓGICA DE BUSCA ---
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setWeeklyData([]);

      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      // Chamadas paralelas
      const [summaryResponse, transactionsResponse, weeklyResponse] = await Promise.all([
        api.get(`/reports/summary`, { params: { month, year } }),
        api.get(`/transactions`, { params: { month, year, page: 1, perPage: 5 } }),
        api.get<WeeklyReportItem[]>('/reports/weeklyReport', { params: { month, year } })
      ]);

      // --- SUMMARY ---
      const incomeVal = Number(summaryResponse.data?.totalIncomes ?? 0);
      const expenseVal = Number(summaryResponse.data?.totalExpense ?? 0);
      
      setSummary({
        income: incomeVal,
        expense: expenseVal,
        balance: summaryResponse.data?.balance ?? 0
      });

      // --- TRANSAÇÕES ---
      const formattedTransactions = transactionsResponse.data.transactions.map((item: any) => ({
        id: item.id,
        description: item.description,
        amount: Number(item.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
        type: item.type,
        category: item.category?.name || "Sem Categoria",
        date: new Date(item.date).toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit' })
      }));

      setRecentTransactions(formattedTransactions);

      // --- GRÁFICO SEMANAL ---
      const rawWeeklyData = weeklyResponse.data;
      const chartFormattedData: any[] = [];

      rawWeeklyData.forEach((weekItem) => {
        // Barra de RECEITA
        chartFormattedData.push({
            value: Number(weekItem.income),
            label: weekItem.week,
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray', fontSize: 10 },
            frontColor: '#c0fd2b',
        });

        // Barra de DESPESA
        chartFormattedData.push({
            value: Number(weekItem.expense),
            frontColor: '#ef4444',
        });
      });
      
      setWeeklyData(chartFormattedData);

    } catch (error) {
      console.log("Erro ao buscar dados do dashboard", error);
      Alert.alert("Erro", "Não foi possível atualizar o dashboard.");
    } finally {
      setIsLoading(false);
    }
  }, [currentDate]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]) 
  );

  // --- HANDLERS ---
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

  const handleAddTransaction = () => navigation.navigate("AddTransaction");
  const handleOpenMenu = () => setIsMenuVisible(true);
  const handleCloseMenu = () => setIsMenuVisible(false);
  const handleSignOut = () => { handleCloseMenu(); signOut(); };
  const handleNavigateToProfile = () => { 
    handleCloseMenu(); 
    navigation.navigate("Profile"); 
  };

  // Formatadores para a View
  const formattedSummary = {
    balance: summary.balance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    income: summary.income.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    expense: summary.expense.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  };


  return (
    <View className="flex-1 bg-gray-900 relative">
      
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        
        {/* HEADER */}
        <DashboardHeader 
            user={user} 
            onOpenMenu={handleOpenMenu} 
            onAddTransaction={handleAddTransaction}
        />

        {/* SELETOR DE MÊS */}
        <MonthSelector 
            date={currentDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
        />

        {/* SELETOR DE ABAS */}
        <TabSelector 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
        />

        {activeTab === "overview" ? (
          <OverviewTab 
            summary={formattedSummary} 
            transactions={recentTransactions}
            barData={weeklyData}
          />
        ) : (
          <CategoriesTab 
            month={currentDate.getMonth() + 1}
            year={currentDate.getFullYear()}
          />
        )}

      </ScrollView>

      {/* --- MODAL DO MENU --- */}
      <DashboardMenu 
        visible={isMenuVisible}
        onClose={handleCloseMenu}
        onProfile={handleNavigateToProfile}
        onSignOut={handleSignOut}
      />

    </View>
  );
}
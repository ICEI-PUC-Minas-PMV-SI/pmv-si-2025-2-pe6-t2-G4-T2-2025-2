import { useState, useCallback, useEffect } from "react";
import { View, ScrollView, Platform, RefreshControl } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CopilotProvider, CopilotStep, walkthroughable, useCopilot } from "react-native-copilot";

import { useAuth } from "../../contexts/AuthContext";
import { useDashboardData } from "@/hooks/useDashboardData";

// Componentes
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardMenu } from "./components/DashboardMenu";
import { TabSelector } from "./components/TabSelector";
import { OverviewTab } from "./components/OverviewTab";
import { CategoriesTab } from "./components/CategoriesTab";
import { MonthSelector } from "./components/MonthSelector"
import { TutorialTooltip } from "@/components/TutorialTooltip";

const WalkableView = walkthroughable(View);
const TUTORIAL_KEY = "@flow:has_seen_tutorial"

const styleTooltip = {
  backgroundColor: "transparent",
  borderRadius: 0,
  paddingTop: 0,
};

function DashboardContent() {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const { start, copilotEvents } = useCopilot()

  const { 
    isLoading, 
    currentDate, 
    summary, 
    recentTransactions, 
    weeklyData, 
    fetchData, 
    handlePrevMonth, 
    handleNextMonth 
  } = useDashboardData();

  const [activeTab, setActiveTab] = useState<"overview" | "categories">("overview");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]) 
  );

  // --- LÓGICA DO TUTORIAL ---
  useEffect(() => {
    const handleTutorialStop = () => {
      void AsyncStorage.setItem(TUTORIAL_KEY, "true");
    };

    copilotEvents.on("stop", handleTutorialStop);

    const checkTutorial = async () => {
      const hasSeen = await AsyncStorage.getItem(TUTORIAL_KEY);
      if (!hasSeen) {
        setTimeout(() => {
             void start();
        }, 1000);
      }
    };
    
    void checkTutorial();

    return () => {
      copilotEvents.off("stop", handleTutorialStop);
    };
  }, []);

  const handleStartTutorial = () => {
    setIsMenuVisible(false);
    setTimeout(() => {
      void start();
    }, 500);
  };

  // Handlers de Navegação/UI
  const handleAddTransaction = () => navigation.navigate("AddTransaction");
  const handleOpenMenu = () => setIsMenuVisible(true);
  const handleCloseMenu = () => setIsMenuVisible(false);
  const handleSignOut = () => { handleCloseMenu(); signOut(); };
  const handleNavigateToProfile = () => { handleCloseMenu(); navigation.navigate("Profile"); };

  return (
    <View className="flex-1 bg-gray-900 relative">
      
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchData} tintColor="#c0fd2b"/>
        }>
        
        {/* HEADER */}
        <CopilotStep 
            text="Botão verde (+) para adicionar uma nova Receita ou Despesa. Não esqueça de adicionar a categoria no menu abaixo!" 
            order={1} 
            name="Nova Transação"
        >
            <WalkableView>
                <DashboardHeader 
                    user={user} 
                    onOpenMenu={handleOpenMenu} 
                    onAddTransaction={handleAddTransaction}
                />
            </WalkableView>
        </CopilotStep>

        {/* SELETOR DE MÊS */}
        <CopilotStep text="Navegue pelos meses aqui." order={2} name="Data">
            <WalkableView>
                <MonthSelector 
                    date={currentDate}
                    onPrevMonth={handlePrevMonth}
                    onNextMonth={handleNextMonth}
                />
            </WalkableView>
        </CopilotStep>

        {/* SELETOR DE ABAS */}
        <CopilotStep text="Alterne entre visão geral e categorias." order={3} name="Abas">
            <WalkableView>
                <TabSelector 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                />
            </WalkableView>
        </CopilotStep>

        {activeTab === "overview" ? (
          <OverviewTab summary={summary} transactions={recentTransactions} barData={weeklyData} />
        ) : (
          <CategoriesTab month={currentDate.getMonth() + 1} year={currentDate.getFullYear()} />
        )}

      </ScrollView>

      {/* --- MODAL DO MENU --- */}
      <DashboardMenu 
        visible={isMenuVisible}
        onClose={handleCloseMenu}
        onProfile={handleNavigateToProfile}
        onSignOut={handleSignOut}
        onHelp={handleStartTutorial}
      />

    </View>
  );
}

export function Dashboard() {
    return (
      <CopilotProvider 
          tooltipComponent={TutorialTooltip}
          tooltipStyle={styleTooltip}
          arrowColor="#c0fd2b"
          backdropColor="rgba(60, 60, 60, 0.9)"
          overlay="svg"
          animated={true}
          verticalOffset={Platform.OS === 'android' ? 35 : 0}
          stepNumberComponent={() => null}
      >
        <DashboardContent />
      </CopilotProvider>
    );
}
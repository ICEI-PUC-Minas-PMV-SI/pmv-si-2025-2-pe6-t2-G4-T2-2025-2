import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BarChart } from "react-native-gifted-charts";
import { SummaryCard } from "./SummaryCard";
import { TransactionCard, TransactionCardProps } from "../../../components/TransactionCard";

interface OverviewTabProps {
  summary: {
    balance: string;
    income: string;
    expense: string;
  };
  transactions: TransactionCardProps[];
  barData?: any[]
}

const defaultBarData = [{ value: 0 }];

export function OverviewTab({ summary, transactions, barData = defaultBarData}: OverviewTabProps) {
  const navigation = useNavigation();

  const maxDataValue = Math.max(...barData.map(item => item.value || 0));
  const chartMaxValue = maxDataValue > 0 ? maxDataValue * 1.2 : 1000;

  return (
    <View className="px-6">
      
      {/* 1. Card de Resumo */}
      <SummaryCard 
        balance={summary.balance}
        income={summary.income}
        expense={summary.expense}
      />

      {/* 2. Gráfico de Barras */}
      <View className="mb-6 items-center">
        <Text className="text-white text-lg font-bold mb-4 self-start">Movimentação</Text>
        <BarChart
            data={barData}
            barWidth={22}
            spacing={14}
            roundedTop
            roundedBottom
            hideRules
            xAxisThickness={0}
            xAxisLabelTextStyle={{ color: 'gray' }}
            yAxisThickness={0}
            yAxisTextStyle={{ color: 'gray' }}
            noOfSections={3}
            maxValue={chartMaxValue}
            isAnimated
            rulesColor="#333"
            rulesType="solid"
        />
      </View>

      {/* 3. Lista de Transações */}
      <View>
        <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg font-bold">Últimas Transações</Text>
            <TouchableOpacity onPress={() => navigation.navigate("TransactionsList")}>
                <Text className="text-green-100 text-sm font-bold">Ver todas</Text>
            </TouchableOpacity>
        </View>

        {transactions.length === 0 ? (
            <Text className="text-gray-500 text-center py-4">Nenhuma transação neste mês.</Text>
        ) : (
            transactions.map((item) => (
                <TransactionCard key={item.id} data={item} />
            ))
        )}
      </View>

    </View>
  );
}
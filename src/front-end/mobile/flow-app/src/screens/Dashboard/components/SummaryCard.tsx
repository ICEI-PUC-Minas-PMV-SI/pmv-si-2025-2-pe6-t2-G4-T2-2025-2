import { View, Text } from "react-native";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react-native";

interface SummaryCardProps {
  balance: string;
  income: string;
  expense: string;
}

export function SummaryCard({ balance, income, expense }: SummaryCardProps) {
  return (
    <View className="bg-gray-800 p-5 rounded-2xl border border-gray-700 mb-6">
      <Text className="text-gray-400 text-sm mb-1 font-medium">Saldo do Mês</Text>
      <Text className="text-white text-3xl font-bold mb-4">{balance}</Text>
      
      <View className="flex-row gap-4">
        {/* Receitas */}
        <View className="flex-1 flex-row items-center gap-2">
            <ArrowUpCircle size={18} color="#c0fd2b" />
            <View>
                <Text className="text-gray-400 text-[10px] uppercase">Receitas</Text>
                <Text className="text-green-100 font-bold">{income}</Text>
            </View>
        </View>

        {/* Divisor Vertical */}
        <View className="w-[1px] h-8 bg-gray-700"></View>
        
        {/* Despesas */}
        <View className="flex-1 flex-row items-center gap-2">
            <ArrowDownCircle size={18} color="#ef4444" />
            <View>
                <Text className="text-gray-400 text-[10px] uppercase">Despesas</Text>
                <Text className="text-red-500 font-bold">{expense}</Text>
            </View>
        </View>
      </View>
    </View>
  );
}
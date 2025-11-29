import { View, Text, TouchableOpacity } from "react-native";
import { ArrowUpCircle, ArrowDownCircle, Trash2 } from "lucide-react-native";

export type TransactionCardProps = {
  id: string;
  description: string;
  amount: string;
  type: "income" | "expense";
  category: string;
  date: string;
};

type Props = {
  data: TransactionCardProps;
  onRemove?: () => void;
};

export function TransactionCard({ data, onRemove }: Props) {
  return (
    <View className="bg-gray-800 rounded-lg p-4 mb-4 flex-row items-center justify-between border border-gray-700">
      
      <View className="flex-row items-center flex-1 gap-3">
        {/* Ícone do Tipo */}
        {data.type === "income" ? (
          <ArrowUpCircle size={24} color="#c0fd2b" />
        ) : (
          <ArrowDownCircle size={24} color="#ef4444" />
        )}
        
        {/* Textos */}
        <View className="flex-1">
          <Text className="text-white text-base font-semibold" numberOfLines={1}>
            {data.description}
          </Text>
          <Text className="text-gray-400 text-xs">
            {data.category} • {data.date}
          </Text>
        </View>
      </View>

      {/* Lado Direito: Valor + Botão Deletar */}
      <View className="flex-row items-center gap-4">
        <Text 
          className={`text-base font-bold ${data.type === "income" ? "text-green-100" : "text-red-500"}`}
        >
          {data.type === "income" ? "+ " : "- "}
          {data.amount}
        </Text>

        {onRemove && (
            <TouchableOpacity onPress={onRemove} hitSlop={10}>
                <Trash2 size={20} color="#ef4444" />
            </TouchableOpacity>
        )}
      </View>
      
    </View>
  );
}
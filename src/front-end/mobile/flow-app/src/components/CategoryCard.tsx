import { View, Text, TouchableOpacity } from "react-native";
import { Trash2, Tag } from "lucide-react-native";

type Props = {
  name: string;
  color?: string; // Opcional, se quisermos bolinhas coloridas
  onRemove: () => void;
};

export function CategoryCard({ name, color = "#c0fd2b", onRemove }: Props) {
  return (
    <View className="w-full bg-gray-800 flex-row items-center justify-between p-4 rounded-xl mb-3 border border-gray-700">
      
      <View className="flex-row items-center gap-3">
        {/* Ícone ou Bolinha de Cor */}
        <View 
          className="w-10 h-10 rounded-full items-center justify-center bg-gray-900 border border-gray-600"
        >
            <Tag size={18} color={color} />
        </View>

        <Text className="text-white font-bold text-base">{name}</Text>
      </View>

      <TouchableOpacity 
        onPress={onRemove}
        className="p-2"
        activeOpacity={0.7}
      >
        <Trash2 size={20} color="#ef4444" />
      </TouchableOpacity>

    </View>
  );
}
import { View, Text, TouchableOpacity } from "react-native";
import { Plus, UserCircle } from "lucide-react-native";

interface DashboardHeaderProps {
  user: { name: string } | null;
  onOpenMenu: () => void;
  onAddTransaction: () => void;
}

export function DashboardHeader({ user, onOpenMenu, onAddTransaction }: DashboardHeaderProps) {
  return (
    <View className="flex-row justify-between items-center pt-14 px-6 mb-6 z-10 relative">
      
      {/* Botão do Perfil */}
      <TouchableOpacity 
        className="flex-row items-center gap-3"
        activeOpacity={0.7}
        onPress={onOpenMenu}
      >
        <View className="w-10 h-10 bg-gray-800 rounded-full items-center justify-center border border-gray-700">
          <UserCircle size={24} color="#c0fd2b" />
        </View>
        
        <View>
          <Text className="text-gray-400 text-xs">Olá,</Text>
          <Text className="text-white font-bold text-sm">
            {user?.name || "Visitante"}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Botão Adicionar Rápido */}
      <TouchableOpacity 
        className="w-10 h-10 bg-green-100 rounded-full items-center justify-center"
        activeOpacity={0.7}
        onPress={onAddTransaction}
      >
        <Plus size={24} color="#1a1a1a" />
      </TouchableOpacity>

    </View>
  );
}
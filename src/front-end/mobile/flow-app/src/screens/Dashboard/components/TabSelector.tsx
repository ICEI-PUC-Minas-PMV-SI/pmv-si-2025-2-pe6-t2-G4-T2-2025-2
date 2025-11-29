import { View, Text, TouchableOpacity } from "react-native";

type TabType = "overview" | "categories";

interface TabSelectorProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <View className="flex-row mx-6 mb-6 bg-gray-800 rounded-xl p-1 border border-gray-700">
      
      {/* Botão Visão Geral */}
      <TouchableOpacity 
        className={`flex-1 py-2 rounded-lg items-center justify-center ${activeTab === "overview" ? "bg-green-100" : "bg-transparent"}`}
        onPress={() => onTabChange("overview")}
      >
        <Text className={`font-bold ${activeTab === "overview" ? "text-gray-900" : "text-gray-400"}`}>
          Visão Geral
        </Text>
      </TouchableOpacity>

      {/* Botão Por Categorias */}
      <TouchableOpacity 
        className={`flex-1 py-2 rounded-lg items-center justify-center ${activeTab === "categories" ? "bg-green-100" : "bg-transparent"}`}
        onPress={() => onTabChange("categories")}
      >
        <Text className={`font-bold ${activeTab === "categories" ? "text-gray-900" : "text-gray-400"}`}>
          Por Categorias
        </Text>
      </TouchableOpacity>

    </View>
  );
}
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

interface MonthSelectorProps {
  date: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function MonthSelector({ date, onPrevMonth, onNextMonth }: MonthSelectorProps) {
  
  const formattedDate = date.toLocaleDateString('pt-BR', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <View className="flex-row items-center justify-center mb-6 gap-2">
      <TouchableOpacity onPress={onPrevMonth} className="p-2">
        <ChevronLeft size={24} color="#c0fd2b" />
      </TouchableOpacity>
      
      <Text className="text-white font-bold px-1 text-lg uppercase">
        {formattedDate}
      </Text>

      <TouchableOpacity onPress={onNextMonth} className="p-2">
        <ChevronRight size={24} color="#c0fd2b" />
      </TouchableOpacity>
    </View>
  );
}
import { useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useCopilot } from 'react-native-copilot';

export function TutorialTooltip() {

  const { 
    goToNext, 
    goToPrev, 
    stop, 
    currentStep, 
    isFirstStep, 
    isLastStep 
  } = useCopilot();
  
  return (
    <View className="bg-gray-800 p-4 rounded-xl border border-green-100 w-64 max-w-xs shadow-lg">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-green-100 font-bold text-lg flex-1 mr-2">
          {currentStep?.order}. {currentStep?.name}
        </Text>
        
        <TouchableOpacity onPress={() => stop()} hitSlop={10}>
            <Text className="text-gray-500 font-bold text-xs uppercase">Pular</Text>
        </TouchableOpacity>
      </View>
      
      <Text className="text-white text-base mb-6 leading-6">
        {currentStep?.text}
      </Text>

      <View className="flex-row justify-end gap-4 items-center">
        {!isFirstStep && (
          <TouchableOpacity onPress={() => goToPrev()} className="px-2 py-2">
            <Text className="text-gray-400 font-bold">Voltar</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
            onPress={() => isLastStep ? stop() : goToNext()}
            className="bg-green-100 px-5 py-2 rounded-full"
        >
          <Text className="text-gray-900 font-bold">
            {isLastStep ? 'Concluir' : 'Próximo'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
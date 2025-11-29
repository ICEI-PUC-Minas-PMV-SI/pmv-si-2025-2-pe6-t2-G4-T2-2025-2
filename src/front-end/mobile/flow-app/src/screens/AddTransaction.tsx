import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator,
  FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { X, TrendingUp, TrendingDown, Calendar as CalendarIcon, Tag } from "lucide-react-native";

import { api } from "@/services/api";
import { Input } from "../components/Input";
import { Button } from "../components/Button"; 
import { parseCurrencyInput } from "@/utils/formatters";

type Category = {
    id: string;
    name: string;
    type: "income" | "expense";
}

export function AddTransaction() {
  const navigation = useNavigation();

  // Estados do Formulário
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amountDisplay, setAmountDisplay] = useState("0,00");
  const [amountRaw, setAmountRaw] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  
  // Estados de Categoria
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);

  // Carregar categorias da API
  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoadingCategories(true);
        const response = await api.get("/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.log("Erro ao carregar categorias", error);
        Alert.alert("Erro", "Não foi possível carregar suas categorias.");
      } finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  const availableCategories = categories.filter(cat => cat.type === type);

  // Função para tratar o valor monetário
  function handleChangeAmount(text: string) {
    const { amount, display } = parseCurrencyInput(text);
    
    setAmountRaw(amount);     // Salva o número (float)
    setAmountDisplay(display); // Salva a string formatada
  }

  // Função para tratar a mudança na data
  function handleChangeDate(event: DateTimePickerEvent, selectedDate?: Date) {
    if (Platform.OS === "android") {
        setShowDatePicker(false);
    }
    if (selectedDate) {
        setDate(selectedDate);
    }
  }

  async function handleSave() {
    if (amountRaw <= 0) {
        return Alert.alert("Atenção", "O valor deve ser maior que zero.");
    }
    if (!description.trim()) {
        return Alert.alert("Atenção", "Informe uma descrição.");
    }
    if (!selectedCategory) {
        return Alert.alert("Atenção", "Selecione uma categoria.");
    }

    try {
        setIsSubmitting(true);

        await api.post("/transactions", {
            description,
            amount: amountRaw,
            type,
            categoryId: selectedCategory,
            date: date.toISOString()
        });

        navigation.goBack();

    } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível salvar a transação.");
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-900"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
        {/* --- HEADER DO MODAL --- */}
        <View className="flex-row justify-between items-center p-6">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <X size={24} color="#9ca3af" />
            </TouchableOpacity>
            <Text className="text-white font-bold text-lg">Nova Transação</Text>
            <View style={{ width: 24 }} />
        </View>

        {/* --- SELETOR DE TIPO --- */}
        <View className="flex-row mx-6 bg-gray-800 rounded-full p-1 mb-8">
            <TouchableOpacity 
                onPress={() => { setType("expense"); setSelectedCategory(""); }}
                className={`flex-1 flex-row items-center justify-center py-3 rounded-full ${type === 'expense' ? 'bg-red-500' : 'bg-transparent'}`}
            >
                <TrendingDown size={20} color={type === 'expense' ? '#fff' : '#9ca3af'} />
                <Text className={`ml-2 font-bold ${type === 'expense' ? 'text-white' : 'text-gray-400'}`}>Despesa</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => { setType("income"); setSelectedCategory(""); }}
                className={`flex-1 flex-row items-center justify-center py-3 rounded-full ${type === 'income' ? 'bg-green-100' : 'bg-transparent'}`}
            >
                <TrendingUp size={20} color={type === 'income' ? '#1a1a1a' : '#9ca3af'} />
                <Text className={`ml-2 font-bold ${type === 'income' ? 'text-gray-900' : 'text-gray-400'}`}>Receita</Text>
            </TouchableOpacity>
        </View>

        {/* --- INPUT DE VALOR --- */}
        <View className="px-6 mb-8">
            <Text className="text-gray-400 text-sm font-medium mb-2">Valor</Text>
            <View className="flex-row items-center">
                <Text className={`text-3xl font-bold mr-2 ${type === 'income' ? 'text-green-100' : 'text-red-500'}`}>R$</Text>
                <TextInput 
                    placeholder="0,00"
                    placeholderTextColor="#4b5563"
                    keyboardType="numeric"
                    className={`text-4xl font-bold flex-1 ${type === 'income' ? 'text-green-100' : 'text-red-500'}`}
                    value={amountDisplay}
                    onChangeText={handleChangeAmount}
                    autoFocus
                />
            </View>
        </View>

        {/* --- FORMULÁRIO --- */}
        <View className="flex-1 px-6 bg-gray-800 rounded-t-3xl pt-8 gap-2">
            <Input 
                label="Descrição"
                placeholder="Ex: Almoço, Salário..."
                value={description}
                onChangeText={setDescription}
            />

            <View>
                <Text className="text-gray-300 text-sm font-medium mb-2">Categoria</Text>
                
                {isLoadingCategories ? (
                    <ActivityIndicator color="#c0fd2b" style={{ alignSelf: 'flex-start' }} />
                ) : (
                    <View>
                         {availableCategories.length === 0 ? (
                             <Text className="text-gray-500 text-sm italic">Nenhuma categoria encontrada. Crie uma na aba Categorias.</Text>
                         ) : (
                             <FlatList 
                                horizontal
                                data={availableCategories}
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 8, paddingRight: 20 }}
                                renderItem={({ item }) => {
                                    const isSelected = selectedCategory === item.id;
                                    return (
                                        <TouchableOpacity
                                            onPress={() => setSelectedCategory(item.id)}
                                            className={`
                                                flex-row items-center px-4 py-2 rounded-full border
                                                ${isSelected 
                                                    ? (type === 'income' ? 'bg-green-100 border-green-100' : 'bg-red-500 border-red-500') 
                                                    : 'bg-gray-900 border-gray-700'}
                                            `}
                                        >

                                            {!isSelected && (
                                                <View className={`w-2 h-2 rounded-full mr-2 ${type === 'income' ? 'bg-green-100' : 'bg-red-500'}`} />
                                            )}
                                            
                                            <Text className={`font-bold text-sm ${isSelected ? (type === 'income' ? 'text-gray-900' : 'text-white') : 'text-gray-300'}`}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }}
                             />
                         )}
                    </View>
                )}
            </View>

            {/* Seletor de Data */}
            <View className="mt-2">
                <Text className="text-gray-300 text-sm font-medium mb-2">Data</Text>
                <TouchableOpacity 
                    onPress={() => setShowDatePicker(true)}
                    className="w-full bg-gray-900 p-4 rounded-lg border border-gray-700 flex-row items-center justify-between"
                >
                    <Text className="text-white text-base">
                        {date.toLocaleDateString('pt-BR')}
                    </Text>
                    <CalendarIcon size={20} color="#9ca3af" />
                </TouchableOpacity>
                
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={handleChangeDate}
                        maximumDate={new Date()}
                        textColor="white"
                        themeVariant="dark" // Ajuda no iOS
                    />
                )}

                {Platform.OS === 'ios' && showDatePicker && (
                     <TouchableOpacity onPress={() => setShowDatePicker(false)} className="items-end mt-2 p-2">
                        <Text className="text-green-100 font-bold">Confirmar</Text>
                     </TouchableOpacity>
                )}
            </View>

            <Button 
                title="Salvar Transação" 
                className="mt-6 mb-10"
                onPress={handleSave}
                isLoading={isSubmitting}
                variant={type === 'income' ? 'primary' : 'outline'}
                // Hackzinho visual: se for despesa (outline), forçamos a borda vermelha via style inline se quiser
                style={type === 'expense' ? { borderColor: '#ef4444' } : {}}
            />
            {/* Se quiser o texto vermelho no botão expense, precisaria ajustar o componente Button, mas o padrão verde/outline funciona bem */}
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
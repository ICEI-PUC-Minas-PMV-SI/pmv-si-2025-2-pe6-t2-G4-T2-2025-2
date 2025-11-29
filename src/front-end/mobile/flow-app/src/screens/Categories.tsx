import { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, Keyboard, ActivityIndicator } from "react-native";
import { Plus, TrendingDown, TrendingUp } from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";

import { api } from "@/services/api";
import { Input } from "../components/Input";
import { CategoryCard } from "../components/CategoryCard";

type CategoryProps = {
  id: string;
  name: string;
  type: "income" | "expense";
};

export function Categories() {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para buscar categorias da API
  async function fetchCategories() {
    try {
      setIsLoading(true);
      const response = await api.get("/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar as categorias.");
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  // Função para Adicionar
  async function handleAddCategory() {
    if (newCategoryName.trim().length === 0) {
      return Alert.alert("Nova Categoria", "Digite o nome da categoria.");
    }

    try {
      setIsSubmitting(true);
      // POST /categories
      await api.post("/categories", {
        name: newCategoryName,
        type: type
      });

      setNewCategoryName("");
      Keyboard.dismiss();
      await fetchCategories();
      
    } catch (error: any) {
      console.log(error);
      
      if (error.response?.status === 409) {
        Alert.alert("Atenção", "Já existe uma categoria com esse nome.");
      } else {
        Alert.alert("Erro", "Não foi possível criar a categoria.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  // Função para Remover
  function handleRemoveCategory(id: string) {
    Alert.alert("Remover", "Deseja remover esta categoria?", [
      { text: "Não", style: "cancel" },
      { 
        text: "Sim", 
        onPress: async () => {
          try {
            await api.delete(`/categories/${id}`);
            setCategories(prevState => prevState.filter(item => item.id !== id));
          } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Não foi possível remover a categoria.");
          }
        } 
      }
    ]);
  }

  const filteredCategories = categories.filter(cat => cat.type === type);


  return (
    <View className="flex-1 bg-gray-900 px-6 pt-14">
      
      <Text className="text-white text-2xl font-bold mb-6">Categorias</Text>

      {/* --- Filtro de Tipo --- */}
      <View className="flex-row mb-6 justify-center gap-4">
        <TouchableOpacity 
            onPress={() => setType("expense")}
            className={`flex-row items-center px-6 py-2 rounded-full border ${type === 'expense' ? 'bg-red-500/10 border-red-500' : 'bg-gray-800 border-gray-700'}`}
        >
            <TrendingDown size={16} color={type === 'expense' ? '#ef4444' : '#9ca3af'} />
            <Text className={`ml-2 font-bold ${type === 'expense' ? 'text-red-500' : 'text-gray-400'}`}>Despesas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={() => setType("income")}
            className={`flex-row items-center px-6 py-2 rounded-full border ${type === 'income' ? 'bg-green-100/10 border-green-100' : 'bg-gray-800 border-gray-700'}`}
        >
            <TrendingUp size={16} color={type === 'income' ? '#c0fd2b' : '#9ca3af'} />
            <Text className={`ml-2 font-bold ${type === 'income' ? 'text-green-100' : 'text-gray-400'}`}>Receitas</Text>
        </TouchableOpacity>
      </View>

      {/* --- Input de Adição Rápida --- */}
      <View className="w-full mb-6 flex-row items-end gap-2">
        <View className="flex-1">
             <Input 
                placeholder="Nova Categoria..."
                value={newCategoryName}
                onChangeText={setNewCategoryName}
                className="mb-0"
             />
        </View>
        
        {/* Botão Quadrado de Adicionar */}
        <TouchableOpacity 
            onPress={handleAddCategory}
            disabled={isSubmitting}
            className={`w-14 h-14 rounded-lg items-center justify-center mb-4 ${isSubmitting ? 'bg-gray-700' : 'bg-green-100'}`}
        >
            {isSubmitting ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Plus size={24} color="#1a1a1a" />
            )}
        </TouchableOpacity>
      </View>

      {/* --- Lista --- */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#c0fd2b" />
        </View>
      ) : (
        <FlatList 
            data={filteredCategories}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
            <CategoryCard 
                name={item.name} 
                onRemove={() => handleRemoveCategory(item.id)}
                color={item.type === 'income' ? '#c0fd2b' : '#ef4444'}
            />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
            <Text className="text-gray-500 text-center mt-10">
                Nenhuma categoria de {type === 'income' ? 'Receita' : 'Despesa'} encontrada.
            </Text>
            )}
        />
      )}

    </View>
  );
}
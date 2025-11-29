import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { api } from "../services/api";
import { TransactionCard, TransactionCardProps } from "../components/TransactionCard";

export function TransactionsList() {
  const navigation = useNavigation();
  
  const [transactions, setTransactions] = useState<TransactionCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  async function fetchTransactions(pageNumber = 1) {
    try {
      if (pageNumber === 1) setIsLoading(true);

      const response = await api.get(`/transactions`, {
        params: {
          page: pageNumber,
          perPage: 15 // Tamanho do lote
        }
      });

      const newTransactions = response.data.transactions.map((item: any) => ({
        id: item.id,
        description: item.description,
        amount: Number(item.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
        type: item.type,
        category: item.category?.name || "Sem Categoria",
        date: new Date(item.date).toLocaleDateString("pt-BR")
      }));

      if (pageNumber === 1) {
        setTransactions(newTransactions);
      } else {
        setTransactions(prev => [...prev, ...newTransactions]);
      }

      const { totalPages } = response.data.pagination;
      setHasMore(pageNumber < totalPages);

    } catch (error) {
      console.log("Erro ao buscar transações", error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  }

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  function handleRemoveTransaction(id: string) {
    Alert.alert("Excluir Transação", "Tem certeza que deseja apagar este lançamento?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Sim, Excluir", 
        style: "destructive",
        onPress: async () => {
            try {
                // 1. Chama a API
                await api.delete(`/transactions/${id}`);
                
                // 2. Atualiza a lista visualmente (Optimistic UI)
                // Remove o item do array sem precisar recarregar tudo
                setTransactions(prev => prev.filter(item => item.id !== id));
                
            } catch (error) {
                console.log(error);
                Alert.alert("Erro", "Não foi possível excluir a transação.");
            }
        }
      }
    ]);
  }

  function handleFetchMore() {
    if (hasMore && !isFetchingMore) {
      setIsFetchingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      fetchTransactions(nextPage);
    }
  }

  return (
    <View className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="pt-14 px-6 pb-4 border-b border-gray-800 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Todas as Transações</Text>
      </View>

      {isLoading && page === 1 ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#c0fd2b" />
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View className="px-6">
              {/* Passamos a função de remover aqui */}
              <TransactionCard 
                data={item} 
                onRemove={() => handleRemoveTransaction(item.id)} 
              />
            </View>
          )}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 40 }}
          onEndReached={handleFetchMore}
          onEndReachedThreshold={0.5} 
          ListFooterComponent={() => (
            isFetchingMore ? <ActivityIndicator color="#c0fd2b" className="my-4" /> : null
          )}
          ListEmptyComponent={() => (
             <Text className="text-gray-500 text-center mt-10">Nenhuma transação encontrada.</Text>
          )}
        />
      )}
    </View>
  );
}
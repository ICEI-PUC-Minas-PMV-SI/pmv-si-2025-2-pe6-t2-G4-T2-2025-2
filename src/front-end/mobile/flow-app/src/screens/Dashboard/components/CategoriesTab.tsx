import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { TrendingDown, TrendingUp } from "lucide-react-native";

import { api } from "@/services/api";
import { useFocusEffect } from "@react-navigation/native";

// Cores para distribuir entre as categorias dinamicamente
const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

interface CategoriesTabProps {
  month: number;
  year: number;
}

interface CategoryReportItem {
  categoryName: string;
  type: "expense" | "income";
  totalAmount: number;
}

// Interface para gráfico
interface PieChartItem {
  value: number;
  color: string;
  text?: string;
  label?: string;
  shiftTextX?: number;
  shiftTextY?: number;
}

export function CategoriesTab({ month, year }: CategoriesTabProps) {
  const [categoryType, setCategoryType] = useState<"expense" | "income">("expense");
  const [chartData, setChartData] = useState<PieChartItem[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  
  // Função buscar de dados da API
  const fetchCategoryData = useCallback(async () => {
    try {
      setIsLoading(true);
    
      const response = await api.get<CategoryReportItem[]>('/reports/categoryReport', {
        params: { month, year }
      });

      const apiData = response.data || [];

      // Filtrar pelo tipo selecionado (Despesa ou Receita)
      const filteredData = apiData.filter(item => item.type === categoryType);

      const total = filteredData.reduce((acc, item) => acc + Number(item.totalAmount), 0);
      setTotalValue(total);

      const formattedData: PieChartItem[] = filteredData.map((item, index) => {
        const value = Number(item.totalAmount);
        const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

        return {
          value,
          color: COLORS[index % COLORS.length],
          text: `${percentage}%`,
          label: item.categoryName,
          shiftTextX: -10, 
        };
      });

      setChartData(formattedData);

    } catch (error) {
      console.log("Erro ao buscar dados de categoria", error);
    } finally {
      setIsLoading(false);
    }
  }, [month, year, categoryType]);

  useFocusEffect(
    useCallback(() => {
      fetchCategoryData();
    }, [fetchCategoryData])
  );

  return (
    <View className="px-6">
            
      {/* Sub-Filtro: Despesas | Receitas */}
      <View className="flex-row mb-8 justify-center gap-4">
          <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => setCategoryType("expense")}
              className={`flex-row items-center px-6 py-2 rounded-full border ${categoryType === 'expense' ? 'bg-red-500/10 border-red-500' : 'bg-gray-800 border-gray-700'}`}
          >
              <TrendingDown size={16} color={categoryType === 'expense' ? '#ef4444' : '#9ca3af'} />
              <Text className={`ml-2 font-bold ${categoryType === 'expense' ? 'text-red-500' : 'text-gray-400'}`}>Despesas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => setCategoryType("income")}
              className={`flex-row items-center px-6 py-2 rounded-full border ${categoryType === 'income' ? 'bg-green-100/10 border-green-100' : 'bg-gray-800 border-gray-700'}`}
          >
              <TrendingUp size={16} color={categoryType === 'income' ? '#c0fd2b' : '#9ca3af'} />
              <Text className={`ml-2 font-bold ${categoryType === 'income' ? 'text-green-100' : 'text-gray-400'}`}>Receitas</Text>
          </TouchableOpacity>
      </View>

      {isLoading ? (
        <View className="items-center justify-center py-10">
            <ActivityIndicator size="large" color="#c0fd2b" />
        </View>
      ) : (
        <>
            {/* Gráfico de Rosca (Donut) */}
            {chartData.length > 0 ? (
                <View className="items-center mb-8">
                    <PieChart
                        data={chartData}
                        donut
                        showText
                        textColor="black"
                        radius={160}
                        innerRadius={85}
                        innerCircleColor={'#000'}
                        textSize={10}
                        showTextBackground
                        textBackgroundRadius={16}
                        centerLabelComponent={() => {
                            return (
                                <View className="justify-center items-center">
                                    <Text className="text-gray-400 text-xs">Total</Text>
                                    <Text className="text-white text-xl font-bold">
                                        {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </Text>
                                </View>
                            );
                        }}
                    />
                </View>
            ) : (
                <View className="items-center py-10">
                    <Text className="text-gray-500">Nenhum dado para este período.</Text>
                </View>
            )}

            {/* Lista Detalhada de Categorias */}
            {chartData.length > 0 && (
                <View>
                    <Text className="text-white text-lg font-bold mb-4">Detalhamento</Text>
                    
                    {chartData.map((item, index) => (
                        <View key={index} className="bg-gray-800 p-4 rounded-xl border border-gray-700 mb-3 flex-row items-center justify-between">
                            <View className="flex-row items-center gap-3">
                                {/* Indicador de Cor */}
                                <View style={{ backgroundColor: item.color }} className="w-3 h-3 rounded-full" />
                                <Text className="text-white font-semibold text-base">{item.label}</Text>
                            </View>
                            
                            <View className="items-end">
                                <Text className="text-white font-bold text-base">
                                    {item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </Text>
                                <Text className="text-gray-400 text-xs">{item.text}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </>
      )}

    </View>
  );
}
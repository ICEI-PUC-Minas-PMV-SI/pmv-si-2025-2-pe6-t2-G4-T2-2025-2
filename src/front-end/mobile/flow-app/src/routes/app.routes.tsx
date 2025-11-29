import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, View } from "react-native";
import { LayoutDashboard, List, Plus } from "lucide-react-native";

import { Dashboard } from "../screens/Dashboard";
import { Categories } from "../screens/Categories";
import { AddTransaction } from "../screens/AddTransaction";
import { Profile } from "@/screens/Profile";
import { TransactionsList } from "@/screens/TransactionsList";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Abas Normais
function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#c0fd2b",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          backgroundColor: "#1a1a1a",
          borderTopWidth: 0,
          height: Platform.OS === "android" ? 70 : 88,
          paddingBottom: Platform.OS === "android" ? 10 : 30,
          paddingTop: 10,
        }
      }}
    >
      <Tab.Screen 
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />
        }}
      />

      {/* BOTÃO CENTRAL (Não renderiza uma aba) */}
      <Tab.Screen 
        name="+ Transação"
        component={View} // Componente vazio
        listeners={({ navigation }) => ({
            tabPress: (e) => {
                e.preventDefault();
                navigation.navigate("AddTransaction");
            }
        })}
        options={{
            tabBarIcon: ({ size }) => (
                <View className="w-14 h-14 bg-green-100 rounded-full items-center justify-center -mt-6 border-4 border-gray-900">
                    <Plus size={28} color="#1a1a1a" />
                </View>
            )
        }}
      />

      <Tab.Screen 
        name="Categories" 
        component={Categories}
        options={{
          tabBarIcon: ({ color, size }) => <List size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

// Stack Principal, envolve as Abas + o Modal
export function AppRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* A tela principal é o conjunto de abas */}
            <Stack.Screen name="MainTabs" component={TabRoutes} />
            
            {/* A tela de Adicionar é uma tela "irmã" das abas */}
            <Stack.Screen 
                name="AddTransaction" 
                component={AddTransaction} 
                options={{ 
                    presentation: 'modal',
                    animation: 'slide_from_bottom' // Garante animação no Android
                }}
            />

            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="TransactionsList" component={TransactionsList} />

      
        </Stack.Navigator>
    );
}
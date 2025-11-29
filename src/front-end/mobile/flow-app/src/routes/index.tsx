import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../contexts/AuthContext";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // TESTE: Usando estilo inline padrão do React Native (sem className)
    return (
      <View style={{ flex: 1, backgroundColor: "#1a1a1a", justifyContent: "center", alignItems: "center" }}>
        {/* Se funcionar, descomente o ActivityIndicator abaixo para testar ele também */}
        <ActivityIndicator size="large" color="#c0fd2b" /> 
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
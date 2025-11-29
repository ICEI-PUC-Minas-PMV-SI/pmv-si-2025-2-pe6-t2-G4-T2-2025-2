import { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Alert, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";

import logoImg from "../assets/flow-logo.png"

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

import { api } from "@/services/api";
import { AxiosError } from "axios";

const signInSchema = z.object({
  email: z.email("E-mail inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type SignInData = z.infer<typeof signInSchema>;

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  
  const { control, handleSubmit, formState: { errors } } = useForm<SignInData>({
    resolver: zodResolver(signInSchema)
  });

  // Hooks de Navegação e Autenticação
  const navigation = useNavigation(); 
  const { signIn } = useAuth();

  async function handleSignIn(data: SignInData) {
    setIsLoading(true);
    try {
      const response = await api.post("/sessions", {
        email: data.email,
        password: data.password
      });

      const { token, user } = response.data;

      await signIn(token, user);

    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError && error.response) {
        Alert.alert("Erro", error.response.data.message);
      } else {
        Alert.alert("Erro", "Não foi possível entrar. Verifique sua conexão.");
      }
      
      setIsLoading(false);
    }
  }

  function handleNavigateToSignUp() {
    navigation.navigate("SignUp");
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-900"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-8 justify-center items-center">
          
          <View className="items-center mb-12">
            <Image source={logoImg} className="w-32 h-32" resizeMode="contain"/>

            <View className="w-20 h-20 bg-gray-800 rounded-full items-center justify-center mb-4">
               <Text className="text-2xl">🚀</Text>
            </View>

            <Text className="text-white text-3xl font-bold">
              App<Text className="text-green-100">Flow</Text>
            </Text>
            <Text className="text-gray-400 text-base mt-2">
              Gerencie suas finanças
            </Text>
          </View>

          <View className="w-full gap-2">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input 
                  label="E-mail"
                  placeholder="seu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input 
                  label="Senha"
                  placeholder="********"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button 
              title="Entrar" 
              className="mt-4"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />

            <Button 
              title="Criar conta" 
              variant="outline"
              className="mt-4"
              onPress={handleNavigateToSignUp}
            />
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
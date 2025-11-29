import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { api } from "@/services/api";
import { AxiosError } from "axios";

// Definição do Schema de Validação
const signUpSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z
    .email("Digite um e-mail válido."),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
  passwordConfirm: z
    .string()
    .min(6, "A confirmação deve ter pelo menos 6 caracteres."),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "As senhas não conferem",
  path: ["passwordConfirm"],
});

// Inferencia de tipo do formulário a partir do Zod
type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation()

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  });

  async function handleSignUp(data: SignUpFormData) {
    setIsLoading(true);
    try {
      await api.post("/users", {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "member"
      })

      Alert.alert("Sucesso", "Conta criada com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() } 
      ]);
      
    } catch (error) {
      console.log(error);

      // Tratamento de erro
      if (error instanceof AxiosError && error.response) {
        Alert.alert("Erro", error.response.data.message);
      } else {
        Alert.alert("Erro", "Não foi possível criar a conta. Verifique sua conexão.");
      }
    } finally {
      setIsLoading(false);
    }
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
        <View className="flex-1 px-8 justify-center items-center py-10">
          
          <View className="items-center mb-8">
            <Text className="text-white text-3xl font-bold mb-2">
              Crie sua conta
            </Text>
            <Text className="text-gray-400 text-base text-center">
              Comece a controlar suas finanças hoje mesmo.
            </Text>
          </View>

          <View className="w-full gap-2">
            
            {/* Uso do Controller para cada campo */}
            
            {/* Campo NOME */}
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input 
                  label="Nome Completo"
                  placeholder="Ex: João Silva"
                  autoCapitalize="words"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            {/* Campo EMAIL */}
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

            {/* Campo SENHA */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input 
                  label="Senha"
                  placeholder="Mínimo 6 caracteres"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            {/* Campo CONFIRMAR SENHA */}
            <Controller
              control={control}
              name="passwordConfirm"
              render={({ field: { onChange, value } }) => (
                <Input 
                  label="Confirmar Senha"
                  placeholder="Repita a senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.passwordConfirm?.message}
                />
              )}
            />

            <Button 
              title="Cadastrar" 
              className="mt-4"
              onPress={handleSubmit(handleSignUp)}
              isLoading={isLoading}
            />
          </View>

          <View className="mt-8 flex-row justify-center items-center">
            <Text className="text-gray-400 text-base">
                Já tem uma conta?
            </Text>
            
            <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
            >
                <Text className="text-green-100 font-bold text-base ml-2">
                Fazer Login
                </Text>
            </TouchableOpacity>
            </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
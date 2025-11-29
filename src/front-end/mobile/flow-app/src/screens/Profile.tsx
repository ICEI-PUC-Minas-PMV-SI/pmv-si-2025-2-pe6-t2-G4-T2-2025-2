import { useState } from "react";
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, User as UserIcon } from "lucide-react-native";
import { AxiosError } from "axios";

import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const profileSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.password && data.password.length < 6) return false;
  return true;
}, {
  message: "A senha deve ter no mínimo 6 caracteres",
  path: ["password"],
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

type ProfileData = z.infer<typeof profileSchema>;

export function Profile() {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      password: "",
      confirmPassword: "",
    }
  });

  async function handleUpdate(data: ProfileData) {
    setIsLoading(true);
    try {
      
      const updateData: any = { name: data.name };
      if (data.password) {
        updateData.password = data.password;
      }

      const response = await api.patch("/users/me", updateData);

      const updatedUserApi = response.data;

      await updateUser({
        ...user!, 
        name: updatedUserApi.name,
        // email e id não mudam, mas se a API retornar, atualizamos
        ...updatedUserApi
      });

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");

      reset({ 
        name: updatedUserApi.name, 
        password: "", 
        confirmPassword: "" 
      });

      

    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError && error.response) {
        Alert.alert("Erro", error.response.data.message || "Falha na atualização.");
      } else {
        Alert.alert("Erro", "Não foi possível atualizar o perfil. Verifique sua conexão.");
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
      {/* Header */}
      <View className="pt-14 px-6 pb-4 border-b border-gray-800 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Meu Perfil</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-gray-800 rounded-full items-center justify-center border-2 border-green-100 mb-4">
             <UserIcon size={40} color="#c0fd2b" />
          </View>
          <Text className="text-gray-400 text-sm">{user?.email}</Text>
        </View>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nome Completo"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <View className="h-[1px] bg-gray-800 my-4" />
        <Text className="text-gray-500 text-sm mb-4 uppercase font-bold">Alterar Senha</Text>

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nova Senha"
              placeholder="Deixe em branco para manter"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Confirmar Nova Senha"
              placeholder="Repita a nova senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />

        <Button 
          title="Salvar Alterações" 
          onPress={handleSubmit(handleUpdate)}
          isLoading={isLoading}
          className="mt-6"
        />

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
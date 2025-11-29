import { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextData = {
  user: User | null;
  isLoading: boolean;
  signIn: (token: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const TOKEN_KEY = "flow_token";
const USER_KEY = "flow_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const storedUser = await SecureStore.getItemAsync(USER_KEY);
        const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);

        if (storedUser && storedToken) {
          api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao carregar dados de sessão", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStorageData();
  }, []);

  // Função de Login (Salva no dispositivo)
  async function signIn(token: string, userData: User) {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(userData));
      
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);
    } catch (error) {
      throw new Error("Não foi possível salvar a sessão.");
    }
  }

  // Função de Logout (Limpa o dispositivo)
  async function signOut() {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  // Função para atualizar os dados do usuário
  async function updateUser(userData: User) {
    try {
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Erro ao atualizar usuário local", error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
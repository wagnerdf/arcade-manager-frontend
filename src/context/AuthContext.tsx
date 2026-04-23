import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../services/authApi";
import { getItem, removeItem, setItem } from "../services/storage";

type AuthContextType = {
  userToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  userToken: null,
  loading: true,
  login: async () => false,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function login(email: string, password: string) {
    try {
      const response = await authApi.post("/login", {
        email,
        password,
      });

      const token = response.data.token;

      setUserToken(token);
      await setItem("token", token);

      return true; // ✅ sucesso
    } catch (error) {
      console.log("Erro no login:", error);
      return false; // ❌ falhou
    }
  }

  async function logout() {
    await removeItem("token"); // primeiro limpa storage
    setUserToken(null); // depois muda estado
  }

  useEffect(() => {
    async function loadToken() {
      try {
        const token = await getItem("token");

        if (token) {
          setUserToken(token);
        }
      } catch (error) {
        console.log("Erro ao carregar token:", error);
      } finally {
        setLoading(false);
      }
    }

    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

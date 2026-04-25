import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { authApi } from "../services/authApi";
import { getItem, removeItem, setItem } from "../services/storage";

type AuthContextType = {
  userToken: string | null;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

type User = {
  fullName: string;
  email: string;
  address: {
    city: string;
    state: string;
  };
};

const AuthContext = createContext<AuthContextType>({
  userToken: null,
  user: null,
  loading: true,
  login: async () => false,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    try {
      const response = await authApi.post("/login", {
        email,
        password,
      });

      const token = response.data.token;

      setUserToken(token);
      await setItem("token", token);

      // BUSCAR DADOS DO USUÁRIO
      const userResponse = await api.get("/users/me");

      const userData = userResponse.data;

      setUser(userData);

      await setItem("user", JSON.stringify(userData));

      return true;
    } catch (error) {
      console.log("Erro no login:", error);
      return false;
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
        const userStorage = await getItem("user");

        if (token) {
          setUserToken(token);
        }

        if (userStorage) {
          setUser(JSON.parse(userStorage));
        }
      } catch (error) {
        console.log("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

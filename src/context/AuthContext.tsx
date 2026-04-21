import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../services/authApi";
import { getItem, removeItem, setItem } from "../services/storage";

type AuthContextType = {
  userToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  userToken: null,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);

  async function login(email: string, password: string) {
    try {
      const response = await authApi.post("/login", {
        email,
        password,
      });

      const token = response.data.token;

      setUserToken(token);

      await setItem("token", token);
    } catch (error) {
      console.log("Erro no login:", error);
    }
  }

  useEffect(() => {
    async function loadToken() {
      const token = await getItem("token");

      if (token) {
        setUserToken(token);
      }
    }

    loadToken();
  }, []);

  async function logout() {
    setUserToken(null);
    await removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

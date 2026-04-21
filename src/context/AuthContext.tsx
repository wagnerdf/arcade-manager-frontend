import { createContext, useContext, useState } from "react";
import { authApi } from "../services/authApi";

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

      console.log("TOKEN SALVO:", token);
    } catch (error) {
      console.log("Erro no login:", error);
    }
  }

  function logout() {
    setUserToken(null);
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

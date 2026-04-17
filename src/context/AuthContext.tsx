import { createContext, useContext, useState } from "react";

type AuthContextType = {
  userToken: string | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  userToken: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);

  function login() {
    setUserToken("fake-token");
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

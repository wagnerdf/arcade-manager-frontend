import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../src/context/AuthContext";

function RootNavigator() {
  const { userToken, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      key={userToken ? "auth-stack" : "guest-stack"}
      screenOptions={{ headerShown: false }}
    >
      {userToken ? (
        // 🔐 ROTAS LOGADAS
        <Stack.Screen name="(tabs)" />
      ) : (
        // 🔓 ROTAS PÚBLICAS
        <>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
        </>
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

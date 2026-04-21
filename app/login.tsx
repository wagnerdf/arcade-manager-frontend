import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { authApi } from "../src/services/authApi";

export default function Login() {
  const router = useRouter();

  async function handleLogin() {
    try {
      const response = await authApi.post("/login", {
        email: "teste",
        password: "159357",
      });

      console.log("RESPOSTA:", response.data);

      // simulando fluxo
      router.replace("/");
    } catch (error) {
      console.log("ERRO:", error);
    }
  }

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Fazer Login" onPress={handleLogin} />
    </View>
  );
}

import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { useAuth } from "../src/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  function handleLogin() {
    login();
    router.replace("/");
  }

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Fazer Login" onPress={handleLogin} />
    </View>
  );
}

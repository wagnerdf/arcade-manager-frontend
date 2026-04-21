import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useAuth } from "../src/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    await login(email, password);
    router.replace("/");
  }

  return (
    <View>
      <Text>Login Screen</Text>

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Fazer Login" onPress={handleLogin} />
    </View>
  );
}

import { Button, Text, View } from "react-native";
import { useAuth } from "../src/context/AuthContext";

export default function Home() {
  const { userToken, logout } = useAuth();

  return (
    <View>
      <Text>Home Screen</Text>
      <Text>Token: {userToken}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

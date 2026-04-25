import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../src/context/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();

      router.replace("/login");
    } catch (error) {
      console.log("Erro no logout:", error);

      alert("Erro ao sair da conta. Tente novamente.");

      router.replace("/login");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Arcade Manager</Text>

      <Text style={styles.subtitle}>
        Bem-vindo, {user?.fullName || "Usuário"}
      </Text>

      <Text style={styles.subtitle}>
        {user ? `${user.address.city} - ${user.address.state}` : ""}
      </Text>

      <Text style={styles.subtitle}>{user?.email || ""}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    color: "#E2E8F0",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 16,
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#EF4444", // vermelho (logout)
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

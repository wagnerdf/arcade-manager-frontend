import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../src/context/AuthContext";

export default function HomeScreen() {
  const { logout } = useAuth();

  async function handleLogout() {
    console.log("CLICOU NO LOGOUT");

    await logout();

    if (typeof window !== "undefined") {
      window.location.href = "/"; // 🔥 força reload no web
    } else {
      router.replace("/"); // mobile
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Arcade Manager</Text>

      <Text style={styles.subtitle}>Você está logado no sistema</Text>

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

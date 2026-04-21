import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  function handleEnter() {
    router.push("/login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../assets/images/arcade.png")}
          style={styles.image}
        />

        <Text style={styles.title}>🎮 Arcade Manager</Text>

        <Text style={styles.subtitle}>
          Organize sua coleção de jogos de forma simples e eficiente
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleEnter}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
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

  content: {
    alignItems: "center",
  },

  title: {
    color: "#E2E8F0",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
  },

  button: {
    backgroundColor: "#22C55E",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 5, // sombra Android
  },

  buttonText: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: 30,
  },
});

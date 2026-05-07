import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateGameScreen() {
  const [gameTitle, setGameTitle] = useState("");

  function handleCancel() {
    router.replace("/library");
  }

  function handleSave() {
    console.log("Salvar jogo:", gameTitle);
    router.replace("/library");
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Adicionar Jogo</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <Text style={styles.label}>Nome do jogo</Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: God of War"
          placeholderTextColor="#64748B"
          value={gameTitle}
          onChangeText={setGameTitle}
        />
      </View>

      {/* ACTIONS */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  title: {
    color: "#E2E8F0",
    fontSize: 18,
    fontWeight: "bold",
  },

  form: {
    marginBottom: 30,
  },

  label: {
    color: "#94A3B8",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#1E293B",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
  },

  actions: {
    marginTop: "auto",
  },

  cancelButton: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 10,
    alignItems: "center",
  },

  cancelText: {
    color: "#94A3B8",
    fontWeight: "bold",
  },

  saveButton: {
    backgroundColor: "#22C55E",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  saveText: {
    color: "#000",
    fontWeight: "bold",
  },
});

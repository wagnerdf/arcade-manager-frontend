import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchGames } from "../../../src/services/externalGameApi";

export default function CreateGameScreen() {
  const [gameTitle, setGameTitle] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleCancel() {
    router.replace("/library");
  }

  function handleSave() {
    console.log("Salvar jogo:", gameTitle);
    router.replace("/library");
  }

  async function handleSearch(text: string) {
    setQuery(text);

    if (!text || text.length < 3) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const data = await searchGames(text);
      setResults(data);
    } catch (error) {
      console.log("Erro ao buscar jogos:", error);
    } finally {
      setLoading(false);
    }
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
          placeholder="Buscar jogo..."
          placeholderTextColor="#64748B"
          value={query}
          onChangeText={handleSearch}
        />
        {/* RESULTADOS */}
        <FlatList
          data={results}
          keyExtractor={(item: any) => item.externalId.toString()}
          renderItem={({ item }: any) => (
            <View style={styles.resultCard}>
              <Image
                source={{ uri: item.backgroundImage }}
                style={styles.resultImage}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.resultTitle}>{item.name}</Text>
                <Text style={styles.resultInfo}>{item.released}</Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* ACTIONS */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancelar</Text>
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
    alignItems: "center",
    backgroundColor: "#EF4444",
  },

  cancelText: {
    color: "#000",
    fontWeight: "bold",
  },

  saveButton: {
    backgroundColor: "#22C55E",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  saveText: {
    color: "#000",
    fontWeight: "bold",
  },

  resultCard: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },

  resultTitle: {
    color: "#fff",
    fontWeight: "bold",
  },

  resultInfo: {
    color: "#94A3B8",
    fontSize: 12,
  },
});

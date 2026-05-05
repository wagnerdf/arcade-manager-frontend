import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserLibrary } from "../../../src/services/userGameApi";

export default function LibraryScreen() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    try {
      const data = await getUserLibrary(0);

      // ⚠️ backend retorna Page → precisamos do content
      setGames(data.content || []);
    } catch (error) {
      console.log("Erro ao buscar library:", error);
    }
  }

  function renderItem({ item }: any) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/library/[id]",
            params: { id: item.id },
          })
        }
      >
        <Text style={styles.gameTitle}>{item.gameTitle}</Text>
        <Text style={styles.gameInfo}>{item.status}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Minha Biblioteca</Text>

      <FlatList
        data={games}
        keyExtractor={(item: any) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
  },

  title: {
    color: "#E2E8F0",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#1E293B",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  gameTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  gameInfo: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 5,
  },
});

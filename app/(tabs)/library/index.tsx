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

        <Text style={styles.gameInfo}>{item.statusDescription}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/library/create")}
      >
        <Text style={styles.addButtonText}>+ Add Game</Text>
      </TouchableOpacity>

      <FlatList
        data={games}
        keyExtractor={(item: any) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <Text style={styles.title}>📚 Minha Biblioteca</Text>
        }
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
  addButton: {
    backgroundColor: "#22C55E",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  addButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
});

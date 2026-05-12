import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserLibrary } from "../../../src/services/userGameApi";

export default function LibraryScreen() {
  const [games, setGames] = useState([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) loadGames();

      return () => {
        isActive = false;
      };
    }, []),
  );

  async function loadGames() {
    try {
      const data = await getUserLibrary(0);

      setGames(data.content || []);
    } catch (error) {
      console.log("Erro ao buscar library:", error);
    }
  }

  function renderItem({ item }: any) {
    if (viewMode === "grid") {
      return (
        <TouchableOpacity
          style={styles.gridCard}
          onPress={() =>
            router.push({
              pathname: "/library/[id]",
              params: { id: item.id },
            })
          }
        >
          <Image source={{ uri: item.coverUrl }} style={styles.coverImage} />

          <Text style={styles.gridTitle} numberOfLines={1}>
            {item.gameTitle}
          </Text>
        </TouchableOpacity>
      );
    }

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

      <View style={styles.header}>
        <Text style={styles.title}>📚 Minha Biblioteca</Text>

        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => setViewMode(viewMode === "list" ? "grid" : "list")}
        >
          <Ionicons
            name={viewMode === "list" ? "grid" : "list"}
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        data={games}
        key={viewMode}
        numColumns={viewMode === "grid" ? 2 : 1}
        keyExtractor={(item: any) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={
          viewMode === "grid" ? { justifyContent: "space-between" } : undefined
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  viewButton: {
    backgroundColor: "#1E293B",
    padding: 10,
    borderRadius: 10,
  },

  gridCard: {
    width: "48%",
    marginBottom: 20,
  },

  coverImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    backgroundColor: "#1E293B",
  },

  gridTitle: {
    color: "#fff",
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
  },
});

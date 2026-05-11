import { getGameStatus, getMediaTypes } from "@/src/services/enumApi";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import placeholderImage from "../../../assets/images/placeholder.png";
import { searchGames } from "../../../src/services/externalGameApi";

export default function CreateGameScreen() {
  // const [gameTitle, setGameTitle] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<string | null>(null);
  const [statusOptions, setStatusOptions] = useState<any[]>([]);
  const [mediaTypeOptions, setMediaTypeOptions] = useState<any[]>([]);
  const [openStatus, setOpenStatus] = useState(false);
  const [openMedia, setOpenMedia] = useState(false);

  const statusItems = statusOptions.map((item) => ({
    label: item.label,
    value: item.code,
  }));

  const mediaItems = mediaTypeOptions.map((item) => ({
    label: item.label,
    value: item.code,
  }));

  useEffect(() => {
    loadEnums();
  }, []);

  async function loadEnums() {
    try {
      const statusData = await getGameStatus();
      const mediaData = await getMediaTypes();

      setStatusOptions(statusData);
      setMediaTypeOptions(mediaData);
    } catch (error) {
      console.log("Erro ao carregar enums:", error);
    }
  }

  function handleCancel() {
    router.replace("/library");
  }

  function handleSave() {
    if (!selectedGame) {
      alert("Selecione um jogo!");
      return;
    }

    if (!status || !mediaType) {
      alert("Preencha status e tipo!");
      return;
    }

    console.log("Salvar jogo:", {
      externalId: selectedGame.externalId,
      name: selectedGame.name,
      cover: selectedGame.backgroundImage,
    });

    router.replace("/library");
  }

  async function handleSearch(text: string) {
    setQuery(text);

    setSelectedGame(null);

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
        {loading && (
          <Text style={{ color: "#fff", marginTop: 10 }}>Buscando...</Text>
        )}

        {/* JOGO SELECIONADO */}
        {selectedGame && (
          <>
            <View style={styles.selectedGameCard}>
              <Image
                source={
                  selectedGame.backgroundImage
                    ? { uri: selectedGame.backgroundImage }
                    : placeholderImage
                }
                style={styles.selectedImage}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.selectedTitle}>{selectedGame.name}</Text>

                <Text style={styles.selectedInfo}>
                  {selectedGame.released || "Sem data"}
                </Text>
              </View>
            </View>

            {/* STATUS */}
            <Text style={styles.label}>Status</Text>

            <View style={{ zIndex: 2000 }}>
              <DropDownPicker
                open={openStatus}
                value={status}
                items={statusItems}
                setOpen={setOpenStatus}
                setValue={setStatus}
                placeholder="Selecione o status..."
              />
            </View>
            {/* MEDIA TYPE */}
            <Text style={styles.label}>Tipo</Text>

            <View style={{ zIndex: 1000 }}>
              <DropDownPicker
                open={openMedia}
                value={mediaType}
                items={mediaItems}
                setOpen={setOpenMedia}
                setValue={setMediaType}
                placeholder="Selecione o tipo..."
              />
            </View>
          </>
        )}
      </View>

      {/* RESULTADOS */}
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        data={results}
        keyExtractor={(item: any) => item.externalId.toString()}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={[
              styles.resultCard,
              selectedGame?.externalId === item.externalId &&
                styles.selectedCard,
            ]}
            onPress={() => {
              setSelectedGame(item);
              setResults([]);
              setQuery(item.name);
            }}
          >
            <Image
              source={
                item.backgroundImage
                  ? { uri: item.backgroundImage }
                  : placeholderImage
              }
              style={styles.resultImage}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.resultTitle}>{item.name}</Text>
              <Text style={styles.resultInfo}>
                {item.released ? item.released : "Sem data"} • ID:{" "}
                {item.externalId}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />

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
    zIndex: 3000,
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
    zIndex: 0,
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

  selectedCard: {
    borderWidth: 2,
    borderColor: "#22c55e",
  },

  selectedText: {
    color: "#22c55e",
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },

  selectedGameCard: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  selectedImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },

  selectedTitle: {
    color: "#fff",
    fontWeight: "bold",
  },

  selectedInfo: {
    color: "#94A3B8",
    fontSize: 12,
  },

  optionRow: {
    flexDirection: "row",
    marginBottom: 15,
  },

  optionButton: {
    backgroundColor: "#1E293B",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },

  selectedOption: {
    backgroundColor: "#22c55e",
  },

  optionText: {
    color: "#fff",
    fontWeight: "bold",
  },

  dropdown: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
    marginBottom: 15,
  },
});

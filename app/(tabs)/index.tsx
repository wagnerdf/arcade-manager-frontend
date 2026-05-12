import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SkeletonStats from "../../src/components/SkeletonStats";
import { useAuth } from "../../src/context/AuthContext";
import { getUserGameStats } from "../../src/services/userGameApi";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);

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

  const [stats, setStats] = useState({
    total: 0,
    playing: 0,
    completed: 0,
    backlog: 0,
    wishlist: 0,
  });

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, []),
  );

  async function loadStats() {
    try {
      setLoading(true);
      setShowLoading(true);

      const data = await getUserGameStats();
      setStats(data);

      const start = Date.now();

      const elapsed = Date.now() - start;
      const MIN_TIME = 600; // 0.6s (ajuste fino UX)

      if (elapsed < MIN_TIME) {
        setTimeout(() => {
          setLoading(false);
          setShowLoading(false);
        }, MIN_TIME - elapsed);
      } else {
        setLoading(false);
        setShowLoading(false);
      }
    } catch (error) {
      console.log("Erro ao buscar stats:", error);
      setLoading(false);
      setShowLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>🎮 Arcade Manager</Text>

      <Text style={styles.subtitle}>
        Bem-vindo, {user?.fullName || "Usuário"}
      </Text>

      <Text style={styles.info}>
        {user ? `${user.address.city} - ${user.address.state}` : ""}
      </Text>

      <Text style={styles.info}>{user?.email || ""}</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Image
          source={require("../../assets/images/gamer.png")}
          style={styles.gamerImage}
          contentFit="cover"
        />

        {/* Stats reais */}
        {showLoading ? (
          Platform.OS === "web" ? (
            <View style={{ marginTop: 20 }}>
              {/* Linha 1 */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: "30%",
                    height: 80,
                    backgroundColor: "#1E293B",
                    borderRadius: 12,
                  }}
                />
                <View
                  style={{
                    width: "30%",
                    height: 80,
                    backgroundColor: "#1E293B",
                    borderRadius: 12,
                  }}
                />
                <View
                  style={{
                    width: "30%",
                    height: 80,
                    backgroundColor: "#1E293B",
                    borderRadius: 12,
                  }}
                />
              </View>

              {/* Linha 2 */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 12,
                }}
              >
                <View
                  style={{
                    width: "48%",
                    height: 80,
                    backgroundColor: "#1E293B",
                    borderRadius: 12,
                  }}
                />
                <View
                  style={{
                    width: "48%",
                    height: 80,
                    backgroundColor: "#1E293B",
                    borderRadius: 12,
                  }}
                />
              </View>
            </View>
          ) : (
            <SkeletonStats />
          )
        ) : (
          <>
            <View style={styles.statsContainer}>
              <StatCard
                title="Jogos"
                value={stats.total}
                icon="game-controller"
              />
              <StatCard title="Jogando" value={stats.playing} icon="play" />
              <StatCard title="Zerados" value={stats.completed} icon="trophy" />
            </View>

            <View style={styles.statsContainer}>
              <StatCard title="Backlog" value={stats.backlog} icon="albums" />
              <StatCard title="Wishlist" value={stats.wishlist} icon="heart" />
            </View>
          </>
        )}

        {/* AÇÕES */}
        <View style={styles.actionsContainer}>
          <ActionButton
            title="Buscar"
            icon="search"
            onPress={() => router.push("/search")}
          />
          <ActionButton
            title="Library"
            icon="game-controller"
            onPress={() => router.push("/library")}
          />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Deslogar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ title, value, icon }: any) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={22} color="#00ffcc" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

function ActionButton({ title, icon, onPress }: any) {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Ionicons name={icon} size={20} color="#000" />
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
    paddingTop: 10,
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
    marginBottom: 5,
  },

  info: {
    color: "#64748B",
    fontSize: 14,
    marginBottom: 10,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  statCard: {
    backgroundColor: "#1E293B",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "30%",
  },

  statValue: {
    color: "#fff",
    fontSize: 18,
    marginTop: 5,
  },

  statTitle: {
    color: "#94A3B8",
    fontSize: 12,
  },

  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  actionButton: {
    backgroundColor: "#22C55E",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "48%",
  },

  actionText: {
    marginTop: 5,
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#EF4444",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  gamerImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginTop: 20,
  },
});

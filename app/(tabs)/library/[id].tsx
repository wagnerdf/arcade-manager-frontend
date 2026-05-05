import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function GameDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Detalhes do jogo {id}</Text>
    </View>
  );
}

import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export default function SkeletonStats() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View style={{ opacity }}>
      {/* Linha 1 */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        {[1, 2, 3].map((_, index) => (
          <View
            key={index}
            style={{
              width: "30%",
              height: 80,
              borderRadius: 12,
              backgroundColor: "#1E293B",
            }}
          />
        ))}
      </View>

      {/* Linha 2 */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 12,
        }}
      >
        {[1, 2].map((_, index) => (
          <View
            key={index}
            style={{
              width: "48%",
              height: 80,
              borderRadius: 12,
              backgroundColor: "#1E293B",
            }}
          />
        ))}
      </View>
    </Animated.View>
  );
}

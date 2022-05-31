import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default function Background({ colors }: { colors: string[] }) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0.8, y: 0 }}
      end={{ x: 0, y: 0.9 }}
      style={styles.background}
    />
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

// icons
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function IconButton({ color, size, name, style, onPress }) {
  return (
    <Ionicons
      style={[styles.icon, style]}
      name={name}
      color={color}
      size={size}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
});

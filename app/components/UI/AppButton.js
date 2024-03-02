import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
// constant colors
import { Colors } from "../../config/colors/Colors";

export default function AppButton({ children, style, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.green700,
    borderRadius: 6,
    padding: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { height: 0, width: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import IconButton from "../UI/IconButton";
import { Colors } from "../../config/colors/Colors";

export default function LogOut({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <IconButton name={"exit"} color={"#ffffffc7"} size={24} />
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    margin: 10,
    backgroundColor: Colors.green700,
    borderRadius: 6,
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
});

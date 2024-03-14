import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../config/colors/Colors";

export default function LoadingOverLay({ message = "Loading..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={"#fff"} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green800,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    color: "#fff",
  },
});

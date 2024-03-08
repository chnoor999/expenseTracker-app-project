import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../config/colors/Colors";

export default function ErrorOverlay({message}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
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
  text:{
    color:"#ffffff4b"
  }
});

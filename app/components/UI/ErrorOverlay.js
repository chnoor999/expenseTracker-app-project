import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../../config/colors/Colors";

export default function ErrorOverlay({ message, onTryAgain }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      {onTryAgain && (
        <TouchableOpacity
          onPress={onTryAgain}
          activeOpacity={0.7}
          style={styles.tryAgainContainer}
        >
          <Text style={styles.tryAgain}>Try Again</Text>
        </TouchableOpacity>
      )}
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
  text: {
    color: "#ffffff4b",
  },
  tryAgainContainer: {
    margin: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: Colors.green700,
    borderRadius: 6,
  },
  tryAgain: {
    color: Colors.green100,
  },
});

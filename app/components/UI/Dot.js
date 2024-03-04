import { StyleSheet, View } from "react-native";

export default function Dot() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: 8,
    borderRadius: 50,
    backgroundColor: "red",
    position: "absolute",
    top: 2,
    right: 3,
  },
});
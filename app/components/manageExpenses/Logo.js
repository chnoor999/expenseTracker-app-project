import { Image, StyleSheet, View } from "react-native";

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/logo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "30%",
    height: "30%",
    borderRadius: 100,
    objectFit: "contain",
  },
});

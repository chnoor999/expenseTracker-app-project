import { StyleSheet, View } from "react-native";
import {Colors} from "../../config/colors/Colors"

export default function Dot() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    right: 12,
    borderWidth:2,
    borderColor:Colors.green100
  },
});

import { StyleSheet, View } from "react-native";
import { Colors } from "../../config/colors/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Dot() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    height: wp(100) > 768 ? 14 : 10,
    width: wp(100) > 768 ? 14 : 10,
    borderRadius: 50,
    backgroundColor: "red",
    position: "absolute",
    borderWidth: 2,
    borderColor: Colors.green100,
    top: hp(1),
    right: hp(0.8),
  },
});

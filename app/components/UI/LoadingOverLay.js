import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../config/colors/Colors";
import { memo } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LoadingOverLay = ({ message = "Loading...", style }) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={hp(4.5)} color={"#fff"} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default memo(LoadingOverLay);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green800,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp(5),
  },
  message: {
    color: "#fff",
    fontSize: hp(1.7),
  },
});

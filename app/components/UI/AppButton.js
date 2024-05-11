import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { memo } from "react";
import { Colors } from "../../config/colors/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AppButton = ({ children, style, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, style]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default memo(AppButton);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.green700,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { height: 0, width: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    marginVertical: hp(0.8),
  },
  text: {
    fontSize: hp(1.8),
    color: "#fff",
  },
});

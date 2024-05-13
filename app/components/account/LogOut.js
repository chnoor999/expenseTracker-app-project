import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { memo } from "react";
import { Colors } from "../../config/colors/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import IconButton from "../UI/Icons";

const LogOut = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <IconButton
        IoniconsIcon
        name={"exit"}
        color={"#ffffffc7"}
        size={hp(2.5)}
      />
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
};

export default memo(LogOut);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(4),
    backgroundColor: Colors.green700,
    borderRadius: 6,
    marginVertical: hp(1),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.2),
  },
  text: {
    fontSize: hp(2),
    color: "#fff",
  },
});

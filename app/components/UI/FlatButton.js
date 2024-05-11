import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { memo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const FlatButton = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default memo(FlatButton);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(0.5),
  },
  text: {
    color: "#ffffff6f",
    fontSize: hp(1.7),
  },
});

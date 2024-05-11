import { Pressable, StyleSheet } from "react-native";
import { memo } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Icons from "./Icons";

const ButtonWithIcon = ({ name, size, color, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Icons size={size} color={color} name={name} />
    </Pressable>
  );
};

export default memo(ButtonWithIcon);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: hp(1),
    borderRadius: 100,
    marginHorizontal: wp(2),
  },
});

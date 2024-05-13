import { Pressable, StyleSheet } from "react-native";
import { memo } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Icons from "./Icons";
import Dot from "../UI/Dot";

const ButtonWithIcon = ({
  name,
  size,
  color,
  onPress,
  active,
  style,
  IoniconsIcon,
  FontAwesomeIcon,
}) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Icons
        size={size}
        color={color}
        name={name}
        IoniconsIcon={IoniconsIcon}
        FontAwesomeIcon={FontAwesomeIcon}
      />
      {active && <Dot />}
    </Pressable>
  );
};

export default memo(ButtonWithIcon);

const styles = StyleSheet.create({
  container: {
    padding: hp(1),
    borderRadius: 100,
    marginHorizontal: wp(2),
  },
});

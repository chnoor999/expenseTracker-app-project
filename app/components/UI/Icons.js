import { memo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Icons = ({
  color,
  size,
  name,
  style,
  onPress,
  IoniconsIcon,
  FontAwesomeIcon,
}) => {
  return (
    <>
      {IoniconsIcon && (
        <Ionicons
          style={style}
          name={name}
          color={color}
          size={size}
          onPress={onPress}
        />
      )}
      {FontAwesomeIcon && (
        <FontAwesome
          style={style}
          name={name}
          color={color}
          size={size}
          onPress={onPress}
        />
      )}
    </>
  );
};

export default memo(Icons);

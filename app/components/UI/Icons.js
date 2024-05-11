import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";

const Icons = ({ color, size, name, style, onPress }) => {
  return (
    <Ionicons
      style={style}
      name={name}
      color={color}
      size={size}
      onPress={onPress}
    />
  );
};

export default memo(Icons);

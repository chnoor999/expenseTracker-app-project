import { Image, Keyboard, StyleSheet, View } from "react-native";
import { memo, useEffect, useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Logo = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return isKeyboardVisible ? (
    <View style={styles.noLogoStyle} />
  ) : (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/logo.png")}
      />
    </View>
  );
};

export default memo(Logo);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(10),
  },
  image: {
    width: hp(10),
    height: hp(10),
  },
  noLogoStyle: {
    paddingTop: hp(10),
  },
});

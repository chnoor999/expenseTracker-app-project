import { StyleSheet, Text, TextInput, View } from "react-native";
import { memo, useCallback, useState } from "react";
import { Colors } from "../../config/colors/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import ButtonWithIcon from "../UI/ButtonWithIcon";

const AppInput = ({
  containerStyle,
  inputStyle,
  label,
  isError,
  forPassword,
  showEyeOnPassword,
  inputWrapper,
  ...props
}) => {
  const [togglePassword, setTogglePassword] = useState(true);

  const togglePasswordHandler = useCallback(() => {
    setTogglePassword((pre) => !pre);
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text style={styles.label}>
          {label} {<Text style={styles.error}>{isError ? "*" : null}</Text>}
        </Text>
      ) : null}
      <View style={[styles.inpContainer, inputWrapper]}>
        <TextInput
          autoCapitalize={"none"}
          autoCorrect={false}
          style={[styles.input, inputStyle]}
          secureTextEntry={forPassword && togglePassword}
          {...props}
        />
        {forPassword && showEyeOnPassword && (
          <ButtonWithIcon
            onPress={togglePasswordHandler}
            name={togglePassword ? "eye" : "eye-off"}
            color={Colors.green700}
            size={hp(2.5)}
            IoniconsIcon
            style={styles.eyeBtn}
          />
        )}
      </View>
    </View>
  );
};

export default memo(AppInput);

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(1),
  },
  label: {
    color: Colors.green100,
    fontSize: hp(1.65),
    marginBottom: hp(0.5),
  },
  inpContainer: {
    backgroundColor: Colors.green100,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    color: Colors.green700,
    fontSize: hp(2.2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.9),
    flex: 1,
  },
  error: {
    color: "tomato",
    fontSize: hp(1.66),
  },
  eyeBtn: {
    margin: 0,
    padding: hp(0.5),
  },
});

import { StyleSheet, View } from "react-native";
import { memo, useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../config/colors/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { debounce } from "lodash";

import AppInput from "../manageExpenses/AppInput";
import AppButton from "../UI/AppButton";
import Logo from "../UI/Logo";
import FlatButton from "../UI/FlatButton";

const AuthContent = ({ isLogin, onAuthenticate, isResetPassword }) => {
  const navigation = useNavigation();

  // state of form data and validation
  const [form, setForm] = useState({
    email: "",
    emailError: false,
    confirmEmail: "",
    confirmEmailError: false,
    password: "",
    passwordError: false,
    confirmPassword: "",
    confirmPasswordError: false,
  });

  // this function swap screens login or signup
  const handleSwapAuthenticationScreen = useCallback(() => {
    navigation.replace(isLogin ? "signUp" : "login");
  }, []);

  // this function put input values in state
  const handleInputChange = useCallback(
    debounce((type, text) => {
      setForm((pre) => {
        return {
          ...pre,
          [type]: text,
        };
      });
    }, 200),
    []
  );

  // this function is confirm button of auth
  const handleConfirmAuth = useCallback(() => {
    // validation
    let emailValidation = !!(
      form?.email?.includes("@") &&
      form?.email?.length > 1 &&
      form?.email?.trim()
    );
    let confirmEmailValidation = !!(form.email === form.confirmEmail);
    let passwordValidation = !!(
      form.password.length >= 8 && form.password.trim()
    );
    let confirmPasswordValidation = !!(form.password === form.confirmPassword);

    // throw error
    if (
      !emailValidation ||
      (!isResetPassword &&
        (!passwordValidation ||
          (!isLogin &&
            (!confirmEmailValidation || !confirmPasswordValidation))))
    ) {
      setForm((pre) => {
        return {
          ...pre,
          emailError: !emailValidation,
          confirmEmailError: !confirmEmailValidation,
          passwordError: !passwordValidation,
          confirmPasswordError: !confirmPasswordValidation,
        };
      });
    } else {
      onAuthenticate({ email: form.email, password: form.password });
    }
  }, [form]);

  const handleResetPassword = useCallback(() => {
    navigation.replace("resetPassword");
  }, []);

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.form}>
        <View style={styles.inputsContainer}>
          <AppInput
            label={"Email"}
            isError={form.emailError}
            onChangeText={(txt) => handleInputChange("email", txt)}
            autoCapitalize={"none"}
            keyboardType={"email-address"}
          />
          {!isResetPassword && !isLogin && (
            <AppInput
              label={"Confirm Email"}
              isError={form.confirmEmailError}
              onChangeText={(txt) => handleInputChange("confirmEmail", txt)}
              autoCapitalize={"none"}
              keyboardType={"email-address"}
            />
          )}
          {!isResetPassword && (
            <AppInput
              label={"Password"}
              isError={form.passwordError}
              onChangeText={(txt) => handleInputChange("password", txt)}
            />
          )}
          {!isResetPassword && !isLogin && (
            <AppInput
              label={"Confirm Password"}
              isError={form.confirmPasswordError}
              onChangeText={(txt) => handleInputChange("confirmPassword", txt)}
            />
          )}
        </View>
        {/* ......................actions......................... */}
        <View>
          {isLogin && (
            <FlatButton onPress={handleResetPassword}>
              Reset Password
            </FlatButton>
          )}
          <AppButton onPress={handleConfirmAuth}>
            {isLogin ? "Login" : isResetPassword ? "Reset Password" : "Sign Up"}
          </AppButton>
          <FlatButton onPress={handleSwapAuthenticationScreen}>
            {isLogin ? "Create a new account" : "Log in instead"}
          </FlatButton>
        </View>
      </View>
    </View>
  );
};

export default memo(AuthContent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green800,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  form: {
    borderRadius: 10,
    backgroundColor: "#00000027",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
  },
});

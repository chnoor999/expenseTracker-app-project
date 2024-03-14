import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
// component
import AppInput from "../manageExpenses/AppInput";
import { Colors } from "../../config/colors/Colors";
import AppButton from "../UI/AppButton";
import Logo from "../manageExpenses/Logo";
import FlatButton from "../UI/FlatButton";

export default function AuthContent({
  isLogin,
  onAuthanticate,
  isResetPassword,
}) {
  const navigation = useNavigation();

  // state of form data and validation
  const [form, setForm] = useState({
    email: "",
    emailISVALID: true,
    confirmEmail: "",
    confirmEmailISVALID: true,
    password: "",
    passwordISVALID: true,
    confirmPassword: "",
    confirmPasswordISVALID: true,
  });

  // this function swap screens login or signup
  const handleSwapAuthenticationScreen = () => {
    navigation.replace(isLogin ? "signUp" : "login");
  };

  // this function put input values in state
  const handleInputChange = (type, text) => {
    setForm((pre) => {
      return {
        ...pre,
        [type]: text,
      };
    });
  };

  // this function is confirm button od auth
  const handleConfirmAuth = () => {
    // validation
    let EMAILISVALID = !!(
      form.email.includes("@") &&
      form.email.length > 1 &&
      form.email.trim()
    );
    let CONFIRMEMAILISVALID = !!(
      form.email === form.confirmEmail &&
      form.confirmEmail.length > 1 &&
      form.confirmEmail.trim()
    );
    let PASSWORDISVALID = !!(form.password.length >= 8 && form.password.trim());
    let CONFIRMEPASSWORDISVALID = !!(
      form.password === form.confirmPassword &&
      form.confirmPassword.length >= 8 &&
      form.confirmPassword.trim()
    );

    // throw error
    if (
      !EMAILISVALID ||
      (!isResetPassword &&
        (!PASSWORDISVALID ||
          (!isLogin && (!CONFIRMEMAILISVALID || !CONFIRMEPASSWORDISVALID))))
    ) {
      setForm((pre) => {
        return {
          ...pre,
          emailISVALID: EMAILISVALID,
          confirmEmailISVALID: CONFIRMEMAILISVALID,
          passwordISVALID: PASSWORDISVALID,
          confirmPasswordISVALID: CONFIRMEPASSWORDISVALID,
        };
      });
    } else {
      onAuthanticate({ email: form.email, password: form.password });
    }
  };

  const handleResetPassword = () => {
    navigation.replace("resetPassword");
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.form}>
        <View style={styles.inputsContainer}>
          <AppInput
            label={"Email"}
            isError={!form.emailISVALID}
            value={form.email}
            onChangeText={handleInputChange.bind(this, "email")}
            autoCapitalize={"none"}
            keyboardType={"email-address"}
            autoCorrect={false}
          />
          {!isResetPassword && !isLogin && (
            <AppInput
              label={"Confirm Email"}
              isError={!form.confirmEmailISVALID}
              value={form.confirmEmail}
              onChangeText={handleInputChange.bind(this, "confirmEmail")}
              autoCapitalize={"none"}
              keyboardType={"email-address"}
              autoCorrect={false}
            />
          )}
          {!isResetPassword && (
            <AppInput
              label={"Password"}
              isError={!form.passwordISVALID}
              value={form.password}
              onChangeText={handleInputChange.bind(this, "password")}
              autoCapitalize={"none"}
              autoCorrect={false}
            />
          )}
          {isLogin && (
            <FlatButton onPress={handleResetPassword}>
              Reset Password
            </FlatButton>
          )}
          {!isResetPassword && !isLogin && (
            <AppInput
              label={"Confirm Password"}
              isError={!form.confirmPasswordISVALID}
              value={form.confirmPassword}
              onChangeText={handleInputChange.bind(this, "confirmPassword")}
              autoCapitalize={"none"}
              autoCorrect={false}
            />
          )}
        </View>
        <View style={styles.btnContainer}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.green800,
  },
  form: {
    borderRadius: 10,
    backgroundColor: "#00000027",
    padding: 15,
  },
});

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
// navigation
import { useNavigation } from "@react-navigation/native";
// constant colors
import { Colors } from "../../config/colors/Colors";
// component
import AppInput from "./AppInput";
import AppButton from "../UI/AppButton";
import Logo from "./Logo";

export default function ExpenseForm() {
  const navigation = useNavigation();

  const onConfirmHandler = () => {};

  const onCancelHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.formContainer}>
      <Logo />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.box1}>
          <AppInput
            label={"Amount"}
            containerStyle={{ flex: 1 }}
            keyboardType={"numeric"}
          />
          <AppInput
            label={"Date"}
            containerStyle={{ flex: 1 }}
            placeholder="YYYY-MM-DD"
          />
        </View>
        <View>
          <AppInput
            label={"Description"}
            multiline={true}
            inputStyle={{ height: 100, textAlignVertical: "top" }}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <AppButton onPress={onCancelHandler}>Cancel</AppButton>
          <AppButton onPress={onConfirmHandler}>Update</AppButton>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: Colors.green800,
    // justifyContent: "center",
    padding: 15,
  },
  box1: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

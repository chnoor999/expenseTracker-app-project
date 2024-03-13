import { StyleSheet, Text, View } from "react-native";
import React from "react";
// navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../authentication/LoginScreen";
import SignUpScreen from "../../authentication/SignUpScreen";
import { Colors } from "../../../config/colors/Colors";
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation:"none"
      }}
    >
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="signUp"
        component={SignUpScreen}
        options={{ title: "SignUp" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

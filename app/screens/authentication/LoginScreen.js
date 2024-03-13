import { StyleSheet, Text, View } from "react-native";
import React from "react";
//component
import AuthContent from "../../components/auth/AuthContent";

export default function LoginScreen() {
  const handleLogin = ({ email, password }) => {
    console.log(email, password);
  };

  return <AuthContent isLogin onAuthanticate={handleLogin} />;
}

const styles = StyleSheet.create({});

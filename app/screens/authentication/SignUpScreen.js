import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import AuthContent from "../../components/auth/AuthContent";
import { AuthSignup } from "../../hooks/auth";
import { useAuthContext } from "../../store/Auth-Context";
import LoadingOverLay from "../../components/UI/LoadingOverLay";

export default function SignUpScreen() {
  const { addToken, addUserId, addUserEmail } = useAuthContext();

  // state for loading
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const data = await AuthSignup({ email, password });
      addToken(data.idToken);
      addUserId(data.localId);
      addUserEmail(data.email);
    } catch (error) {
      console.log(error.response.data.error.message)
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingOverLay />;
  }

  return <AuthContent onAuthanticate={handleSignup} />;
}

const styles = StyleSheet.create({});

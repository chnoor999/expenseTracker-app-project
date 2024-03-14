import { Alert, StyleSheet} from "react-native";
import React, { useState } from "react";
import AuthContent from "../../components/auth/AuthContent";

import { resetPassword } from "../../hooks/auth";
import LoadingOverLay from "../../components/UI/LoadingOverLay";

export default function ResetPasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async ({ email }) => {
    try {
      setIsLoading(true);
      const data = await resetPassword({email});
      Alert.alert(
        "Password Reset",
        `Password reset email sent successfully to ${data.email}`
      );
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Error", "Error resetting password Try Again later");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingOverLay />;
  }

  return <AuthContent isResetPassword onAuthanticate={handleResetPassword} />;
}

const styles = StyleSheet.create({});

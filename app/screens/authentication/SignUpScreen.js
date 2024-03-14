import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import AuthContent from "../../components/auth/AuthContent";
import { AuthSignup } from "../../hooks/auth";
import { useAuthContext } from "../../store/Auth-Context";
import LoadingOverLay from "../../components/UI/LoadingOverLay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";

export default function SignUpScreen() {
  const { addToken, addUserId, addUserEmail } = useAuthContext();

  // state for loading
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTryAgain = () => {
    setError("");
  };

  const handleSignup = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const data = await AuthSignup({ email, password });
      addToken(data.idToken);
      addUserId(data.localId);
      addUserEmail(data.email);
    } catch (error) {
      switch (error.response.data.error.message) {
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          setError("Too many signup attempts. Please try again later.");
          break;
        case "EMAIL_EXISTS":
          setError(
            "This email is already in use. Please use a different email."
          );
        default:
          setError("An unexpected error occurred during login:", error.message);
      }
      setIsLoading(false);
    }
  };

  if (!!error) {
    return <ErrorOverlay message={error} onTryAgain={handleTryAgain} />;
  }

  if (isLoading) {
    return <LoadingOverLay />;
  }

  return <AuthContent onAuthanticate={handleSignup} />;
}

const styles = StyleSheet.create({});

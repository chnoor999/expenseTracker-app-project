import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import AuthContent from "../../components/auth/AuthContent";
import { Authlogin } from "../../hooks/auth";
import { useAuthContext } from "../../store/Auth-Context";
import LoadingOverLay from "../../components/UI/LoadingOverLay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";

export default function LoginScreen() {
  const { addToken, addUserId, addUserEmail, addExpiredTime } =
    useAuthContext();

  // state for loading
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTryAgain = () => {
    setError("");
  };

  const handleLogin = async ({ email, password }) => {
    const timeOfExpire = Date.now() + 3600 * 1000;

    try {
      setIsLoading(true);
      const data = await Authlogin({ email, password });
      addToken(data.idToken);
      addUserId(data.localId);
      addUserEmail(data.email);
      addExpiredTime(timeOfExpire);
    } catch (error) {
      switch (error.response.data.error.message) {
        case "INVALID_LOGIN_CREDENTIALS":
          setError("Invalid email or password. Please try again.");
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":
          setError("Too many login attempts. Please try again later.");
          break;
        case "USER_DISABLED":
          setError("Your account has been disabled.");
          break;
        default:
          setError("An unexpected error occurred during login");
      }
      setIsLoading(false);
    }
  };

  if (!!error) {
    return <ErrorOverlay message={error} onTryAgain={handleTryAgain} />;
  }

  if (isLoading) {
    return (
      <>
        <LoadingOverLay message={"Logging in"} />
      </>
    );
  }

  return <AuthContent isLogin onAuthanticate={handleLogin} />;
}

const styles = StyleSheet.create({});

import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useAuthContext } from "../../store/Auth-Context";

import { Colors } from "../../config/colors/Colors";
import ProfileLogo from "../../components/account/ProfileLogo";
import LogOut from "../../components/account/LogOut";
import LoadingOverlay from "../../components/UI/LoadingOverLay";

export default function AccountScreen() {
  const { removeToken, removeUserId, userEmail } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          setIsLoading(true);
          await removeToken();
          await removeUserId();
        },
      },
    ]);
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ProfileLogo />
      <View style={styles.emailContainer}>
        <Text style={styles.email}>{userEmail}</Text>
      </View>
      <LogOut onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green800,
  },
  emailContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  email: {
    color: "#fff",
    paddingBottom: 20,
  },
});

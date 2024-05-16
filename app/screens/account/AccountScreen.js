import { Alert, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { useAuthContext } from "../../store/Auth-Context";
import { Colors } from "../../config/colors/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import ProfileLogo from "../../components/account/ProfileLogo";
import LogOut from "../../components/account/LogOut";
import LoadingOverlay from "../../components/UI/LoadingOverLay";
import Icons from "../../components/UI/Icons";

export default function AccountScreen() {
  const { userEmail, logOutHandler } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          setIsLoading(true);
          logOutHandler();
        },
      },
    ]);
  };

  if (isLoading) {
    return <LoadingOverlay message={"Logging out"} />;
  }

  return (
    <View style={styles.container}>
      <ProfileLogo />
      <View style={styles.emailContainer}>
        <View style={styles.icon}>
          <Icons
            FontAwesomeIcon
            name={"envelope"}
            size={hp(1.6)}
            color={"#fff"}
          />
          <Text style={styles.email}>{userEmail}</Text>
        </View>
      </View>
      <LogOut onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green800,
    paddingHorizontal: wp(3),
  },
  emailContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(1.6),
  },
  email: {
    color: "#fff",
    fontSize: hp(1.8),
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: wp(1),
  },
});

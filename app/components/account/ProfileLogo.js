import { Image, StyleSheet, View } from "react-native";
import { memo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ProfileLogo = () => {
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/profileLogo.png")}
        />
      </View>
    </View>
  );
};

export default memo(ProfileLogo);

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(5),
  },
  image: {
    width: hp(11),
    height: hp(11),
  },
});

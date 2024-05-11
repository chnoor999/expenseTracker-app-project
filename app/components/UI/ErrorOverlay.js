import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { memo } from "react";
import { Colors } from "../../config/colors/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ErrorOverlay = ({ message, onTryAgain, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{message}</Text>
      {onTryAgain && (
        <TouchableOpacity
          onPress={onTryAgain}
          activeOpacity={0.7}
          style={styles.tryAgainContainer}
        >
          <Text style={styles.tryAgain}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(ErrorOverlay);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green800,
    alignItems: "center",
    justifyContent: "center",
    gap: hp(1.5),
    paddingHorizontal: wp(5),
  },
  text: {
    color: "#ffffff6f",
    fontSize: hp(1.8),
    textAlign:"center"
  },
  tryAgainContainer: {
    backgroundColor: Colors.green700,
    borderRadius: 6,
    paddingHorizontal: wp(6),
    paddingVertical: hp(1),
  },
  tryAgain: {
    color: Colors.green100,
    fontSize: hp(1.7),
  },
});

import { StyleSheet, Text, TextInput, View } from "react-native";
import { memo } from "react";
import { Colors } from "../../config/colors/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AppInput = ({ containerStyle, inputStyle, label, isError, ...props }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text style={styles.label}>
          {label} {<Text style={styles.error}>{isError ? "*" : null}</Text>}
        </Text>
      ) : null}
      <TextInput
        autoCapitalize={"none"}
        autoCorrect={false}
        style={[styles.input, inputStyle]}
        {...props}
      />
    </View>
  );
};

export default memo(AppInput);

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(1),
  },
  label: {
    color: Colors.green100,
    fontSize: hp(1.65),
    marginBottom: hp(0.5),
  },
  input: {
    backgroundColor: Colors.green100,
    borderRadius: 6,
    color: Colors.green700,
    fontSize: hp(2.2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.9),
  },
  error: {
    color: "tomato",
    fontSize: hp(1.66),
  },
});

import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { memo } from "react";
import { Colors } from "../../config/colors/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import AppInput from "../manageExpenses/AppInput";

const FilterBox = ({ visible, onCancel, onApply, date, handleDateChange }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.box}>
          <View>
            <Text style={styles.text}>
              Enter the date of the expense you want to access.
            </Text>
          </View>
          <View>
            <AppInput
              placeholder="YYYY-MM-DD"
              inputStyle={[
                styles.input,
                date.isValid ? null : styles.inputError,
              ]}
              value={date.value}
              onChangeText={handleDateChange}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={onCancel}>
              <Text style={styles.cancel}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={onApply}>
              <Text style={styles.apply}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(FilterBox);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: Colors.green900,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width: wp(80),
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
  },
  text: {
    textAlign: "center",
    lineHeight: 20,
    color: "#fff",
    fontSize: hp(1.85),
    marginTop: hp(1),
  },
  input: {
    alignSelf: "center",
    marginVertical: hp(1),
    fontSize: hp(2.4),
  },
  inputError: {
    backgroundColor: "#f7b4a8",
  },
  btnContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#ffffff30",
    gap: wp(1.5),
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(0.5),
  },
  cancel: {
    color: "#ffffffb7",
    fontSize: hp(1.7),
  },
  apply: {
    color: "#05a8ff",
    fontSize: hp(1.7),
  },
});

import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { memo, useState } from "react";
import { Colors } from "../../config/colors/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useExpenseContext } from "../../store/Expense-Context";

import AppInput from "../manageExpenses/AppInput";

const FilterBox = ({ visible, setFilterBoxVisible, setFilteredData }) => {
  const { data } = useExpenseContext();
  const [date, setDate] = useState({ value: "", error: false });

  const handleDateChange = (txt) => {
    setDate((pre) => {
      return {
        ...pre,
        value: txt,
      };
    });
  };

  const onRemove = () => {
    setFilterBoxVisible(false);
    setDate({ value: "", error: false });
    setFilteredData({ showFilteredData: false, data: [] });
  };

  const onApply = () => {
    const dateObj = new Date(date.value);
    const dateIsValid = dateObj.toString() !== "Invalid Date";

    if (dateIsValid) {
      const filtered = data.filter((item) => {
        return (
          item.date.toISOString().slice(0, 10) ===
          dateObj.toISOString().slice(0, 10)
        );
      });

      setFilteredData({ showFilteredData: true, data: filtered });
      setFilterBoxVisible(false);
      setDate((pre) => {
        return { ...pre, error: false };
      });
    } else {
      setDate((pre) => ({ ...pre, error: true }));
    }
  };

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
              inputStyle={[styles.input]}
              onChangeText={handleDateChange}
              value={date.value}
              containerStyle={styles.inpContainer}
              inputWrapper={date.error && styles.inputError}
            />
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={onRemove}>
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
  inpContainer: {
    marginVertical: hp(0.5),
  },
  input: {
    alignSelf: "center",
    fontSize: hp(2.4),
    flex: 0,
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

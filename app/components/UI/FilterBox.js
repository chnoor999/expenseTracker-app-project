import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../../config/colors/Colors";
import AppInput from "../manageExpenses/AppInput";

export default function FilterBox({
  visible,
  onCancel,
  onApply,
  date,
  handleDateChange,
}) {
  return (
    <Modal transparent={true} visible={visible} animationType="none">
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
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.cancel}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onApply}>
              <Text style={styles.apply}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: Colors.green900,
    borderRadius: 6,
    width: 250,
    padding: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
  },
  text: {
    paddingVertical: 10,
    textAlign: "center",
    lineHeight: 20,
    color: "#fff",
  },
  input: {
    alignSelf: "center",
    marginVertical: 10,
  },
  inputError: {
    backgroundColor: "#f7b4a8",
  },
  btnContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderColor: "#ffffff14",
  },
  cancel: {
    color: "#ffffffb7",
    padding: 10,
  },
  apply: {
    padding: 10,
    color: "#05a8ff",
  },
});

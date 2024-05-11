import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Colors } from "../../config/colors/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useExpenseContext } from "../../store/Expense-Context";
import { useAuthContext } from "../../store/Auth-Context";
import { delExpense } from "../../hooks/axios";

import LoadingOverlay from "../UI/LoadingOverLay";
import ErrorOverlay from "./ErrorOverlay";

const DeleteBox = ({ navigation, route }) => {
  const { id } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { deleteExpense } = useExpenseContext();
  const { token, userUid } = useAuthContext();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      setError("");
      await delExpense(token, userUid, id);
      deleteExpense(id);
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      setError("Fail to Delete the Expense, Try Again Later");
    }
  };

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {isLoading ? (
          <LoadingOverlay style={styles.noBg} message="Deleting Expense" />
        ) : error ? (
          <ErrorOverlay style={styles.noBg} message={error} />
        ) : (
          <>
            <Text style={styles.text}>
              Are you sure you want to delete this expense?
            </Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btn} onPress={onCancel}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={onDelete}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default DeleteBox;

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
    shadowColor: "#000",
    width: wp(70),
    height: hp(13),
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
  },
  text: {
    textAlign: "center",
    lineHeight: 20,
    color: "#fff",
    fontSize: hp(1.85),
    paddingVertical: hp(1),
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
  delete: {
    color: "#ff6347ff",
    fontSize: hp(1.7),
  },
  cancel: {
    color: "#ffffffb7",
    fontSize: hp(1.7),
  },
  noBg: {
    backgroundColor: "transparent",
  },
});

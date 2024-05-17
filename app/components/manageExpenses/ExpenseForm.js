import { StyleSheet, View } from "react-native";
import { memo, useCallback, useMemo, useState } from "react";
import { useExpenseContext } from "../../store/Expense-Context";
import { editExpense, postExpense } from "../../hooks/axios";
import { useAuthContext } from "../../store/Auth-Context";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../config/colors/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import AppInput from "./AppInput";
import AppButton from "../UI/AppButton";
import Logo from "../UI/Logo";
import ErrorOverlay from "../UI/ErrorOverlay";
import LoadingOverlay from "../UI/LoadingOverLay";

const ExpenseForm = ({ isEditing, editID }) => {
  const navigation = useNavigation();

  const { data, edit, add } = useExpenseContext();
  let { token, userUid, exchangeTokenIfExpired } = useAuthContext();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //finding data of editable expense
  const editableExpense = useMemo(
    () => data.find((item) => item.id == editID),
    [data]
  );

  const today = new Date();

  // state that holds form data
  const [form, setForm] = useState({
    amount: isEditing ? editableExpense.amount.toString() : "",
    amountError: false,
    date: isEditing
      ? editableExpense.date.toISOString().slice(0, 10)
      : today.toISOString().slice(0, 10),
    dateError: false,
    description: isEditing ? editableExpense.description : "",
    descriptionError: false,
  });

  // function that store input text in it place
  const handleOnChange = useCallback((type, text) => {
    setForm((preValue) => {
      return {
        ...preValue,
        [type]: text,
      };
    });
  }, []);

  const onConfirmHandler = useCallback(async () => {
    const object = {
      amount: +form.amount,
      date: new Date(form.date),
      description: form.description,
    };

    // validation
    const amountError = !isNaN(object.amount) && object.amount > 0;
    const dateError = object.date != "Invalid Date";
    const descriptionError = object.description.trim().length > 0;

    if (!amountError || !dateError || !descriptionError) {
      setForm((pre) => {
        return {
          ...pre,
          amountError: !amountError,
          dateError: !dateError,
          descriptionError: !descriptionError,
        };
      });
    } else {
      if (isEditing) {
        try {
          setIsLoading(true);
          // exchanging token if expire
          const newToken = await exchangeTokenIfExpired();
          if (newToken) token = newToken;

          await editExpense(token, userUid, editID, object);
          edit(editID, object);
          navigation.goBack();
        } catch (error) {
          setError("Failed to edit expense try again later.");
        }
      } else {
        try {
          setIsLoading(true);
          // exchanging token if expire
          const newToken = await exchangeTokenIfExpired();
          if (newToken) token = newToken;

          const id = await postExpense(token, userUid, object);
          add({ ...object, id });
          navigation.goBack();
        } catch (error) {
          setError("Failed to add expense try again later.");
        }
      }
    }
  }, [form]);

  const onCancelHandler = useCallback(() => {
    navigation.goBack();
  }, []);

  if (error) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.formContainer}>
      <Logo />
      <View style={styles.box1}>
        <AppInput
          label={"Amount"}
          keyboardType={"numeric"}
          value={form.amount}
          onChangeText={(txt) => handleOnChange("amount", txt)}
          isError={form.amountError}
          containerStyle={styles.inpContainer}
        />
        <AppInput
          label={"Date"}
          placeholder="YYYY-MM-DD"
          containerStyle={styles.inpContainer}
          value={form.date}
          onChangeText={(txt) => handleOnChange("date", txt)}
          isError={form.dateError}
        />
      </View>
      <AppInput
        label={"Description"}
        multiline={true}
        inputStyle={{ height: hp(12), textAlignVertical: "top" }}
        value={form.description}
        onChangeText={(txt) => handleOnChange("description", txt)}
        isError={form.descriptionError}
      />
      <View style={styles.buttonsContainer}>
        <AppButton containerStyle={styles.btn} onPress={onCancelHandler}>
          Cancel
        </AppButton>
        <AppButton containerStyle={styles.btn} onPress={onConfirmHandler}>
          {isEditing ? "Update" : "Add"}
        </AppButton>
      </View>
    </View>
  );
};

export default memo(ExpenseForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: Colors.green800,
    paddingHorizontal: wp(3),
  },
  box1: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2),
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(2),
    gap: wp(4),
  },
  btn: {
    flex: 1,
  },
  inpContainer: {
    flex: 1,
  },
});

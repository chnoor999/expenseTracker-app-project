import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import React, { useState } from "react";
//context
import { useExpenseContext } from "../../store/Expense-Context";
// navigation
import { useNavigation } from "@react-navigation/native";
// constant colors
import { Colors } from "../../config/colors/Colors";
// component
import AppInput from "./AppInput";
import AppButton from "../UI/AppButton";
import Logo from "./Logo";
import { editExpense, postExpense } from "../../hooks/axios";
import ErrorOverlay from "../UI/ErrorOverlay";
import LoadingOverlay from "../UI/LoadingOverLay"

export default function ExpenseForm({ isEditing, editID }) {
  const navigation = useNavigation();
  const { data, edit, add } = useExpenseContext();

  const [error, setError] = useState();
  const [isLoading,setIsLoading] = useState(false)

  //finding data of editabele expense
  const editabeleExpense = data.find((item) => item.id == editID);

  const today = new Date();

  // state that holds form data
  const [form, setForm] = useState({
    amount: isEditing ? editabeleExpense.amount.toString() : "",
    amountISVALID: true,
    date: isEditing
      ? editabeleExpense.date.toISOString().slice(0, 10)
      : today.toISOString().slice(0, 10),
    dateISVALID: true,
    description: isEditing ? editabeleExpense.description : "",
    descriptionISVALID: true,
  });

  // function that store input text in it place
  const handleOnChange = (type, text) => {
    setForm((prevalue) => {
      return {
        ...prevalue,
        [type]: text,
      };
    });
  };

  const onConfirmHandler = async () => {
    const object = {
      amount: +form.amount,
      date: new Date(form.date),
      description: form.description,
    };

    // form valiadtion
    const amountISVALID = !isNaN(object.amount) && object.amount > 0;
    const dateISVALID = object.date != "Invalid Date";
    const descriptionISVALID = object.description.trim().length > 0;

    if (!amountISVALID || !dateISVALID || !descriptionISVALID) {
      setForm((pre) => {
        return {
          ...pre,
          amountISVALID,
          dateISVALID,
          descriptionISVALID,
        };
      });
    } else {
      if (isEditing) {
        try {
          setIsLoading(true)
          edit(editID, object);
          await editExpense(editID, object);
          navigation.goBack();
        } catch (error) {
          setError("Failed to edit expense try again later.");
        }
      } else {
        try {
          setIsLoading(true)
          const id = await postExpense(object);
          add({ ...object, id });
          navigation.goBack();
        } catch (error) {
          setError("Failed to add expense try again later.");
        }
      }
    }
  };

  const onCancelHandler = () => {
    navigation.goBack();
  };

  if (error?.length) {
    return <ErrorOverlay message={error} />;
  }

  if(isLoading){
    return <LoadingOverlay />
  }

  return (
    <View style={styles.formContainer}>
      <Logo />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.box1}>
          <AppInput
            label={"Amount"}
            containerStyle={{ flex: 1 }}
            keyboardType={"numeric"}
            value={form.amount}
            onChangeText={handleOnChange.bind(this, "amount")}
            isError={!form.amountISVALID}
          />
          <AppInput
            label={"Date"}
            containerStyle={{ flex: 1 }}
            placeholder="YYYY-MM-DD"
            value={form.date}
            onChangeText={handleOnChange.bind(this, "date")}
            isError={!form.dateISVALID}
          />
        </View>
        <View>
          <AppInput
            label={"Description"}
            multiline={true}
            inputStyle={{ height: 100, textAlignVertical: "top" }}
            value={form.description}
            onChangeText={handleOnChange.bind(this, "description")}
            isError={!form.descriptionISVALID}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <AppButton onPress={onCancelHandler}>Cancel</AppButton>
          <AppButton onPress={onConfirmHandler}>
            {isEditing ? "Update" : "Add"}
          </AppButton>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: Colors.green800,
    padding: 15,
  },
  box1: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

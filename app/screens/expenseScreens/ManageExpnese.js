import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import ExpenseForm from "../../components/manageExpenses/ExpenseForm";
import IconButton from "../../components/UI/IconButton";
import { Colors } from "../../config/colors/Colors";
import { useExpenseContext } from "../../store/Expense-Context";

export default function ManageExpnese({ route, navigation }) {
  // id of expense object that want to edit
  const editID = route.params?.id;
  // condition for this screen is for editing or not
  const isEditing = !!editID;

  const { deleteExpense } = useExpenseContext();

  // function handle press delete
  const handleDelete = () => {
    deleteExpense(editID);
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add expense",
      headerRight: () =>
        isEditing ? (
          <IconButton
            name={"trash"}
            size={24}
            color={Colors.green100}
            onPress={handleDelete}
          />
        ) : null,
    });
  }, []);

  useLayoutEffect(() => {
    if (isEditing) {
      navigation.setOptions({ animation: "slide_from_right" });
    } else {
      navigation.setOptions({ animation: "slide_from_bottom" });
    }
  }, []);

  return <ExpenseForm editID={editID} isEditing={isEditing} />;
}

const styles = StyleSheet.create({});

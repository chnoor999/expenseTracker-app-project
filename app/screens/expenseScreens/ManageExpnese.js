import React, { useLayoutEffect, useState } from "react";
// component
import ExpenseForm from "../../components/manageExpenses/ExpenseForm";
import IconButton from "../../components/UI/IconButton";
// constant color
import { Colors } from "../../config/colors/Colors";
// context
import { useExpenseContext } from "../../store/Expense-Context";
import { delExpense } from "../../hooks/axios";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import LoadingOverlay from "../../components/UI/LoadingOverLay";

export default function ManageExpnese({ route, navigation }) {
  // id of expense object that want to edit
  const editID = route.params?.id;
  // condition for this screen is for editing or not
  const isEditing = !!editID;

  const { deleteExpense } = useExpenseContext();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // function handle press delete
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await delExpense(editID);
      deleteExpense(editID);
      navigation.goBack();
    } catch (error) {
      setError("Failed to delete expense try again later.");
    }
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

  if (error?.length) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return <ExpenseForm editID={editID} isEditing={isEditing} />;
}

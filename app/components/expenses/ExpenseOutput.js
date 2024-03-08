import { FlatList, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
// constant colors
import { Colors } from "../../config/colors/Colors";
// context
import { useExpenseContext } from "../../store/Expense-Context";
// component
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import DeleteBox from "../UI/DeleteBox";
import { delExpense } from "../../hooks/axios";
import ErrorOverlay from "../UI/ErrorOverlay";

export default function ExpenseOutput({
  expensePeriod,
  expenseData,
  emptyText,
  swapButton,
}) {
  const { deleteExpense } = useExpenseContext();

  // delete the expense on long press
  const [deleteBox, setDeletebox] = useState(false);
  const [deletedID, setdeletedID] = useState();

  const handleDeleteExpense = (id) => {
    setDeletebox(true);
    setdeletedID(id);
  };

  const [error, setError] = useState();

  const onDelete = async () => {
    try {
      await delExpense(deletedID);
      deleteExpense(deletedID);
      setDeletebox(false);
      setdeletedID(null);
    } catch (error) {
      setError("Failed to delete expense try again later.");
    }
  };
  const onCancel = () => {
    setDeletebox(false);
  };

  if (!!error) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseSummary
        expensePeriod={expensePeriod}
        expense={expenseData}
        swapButton={swapButton}
      />
      {expenseData.length ? (
        <FlatList
          data={expenseData}
          renderItem={({ item }) => (
            <ExpenseList
              onLongPress={handleDeleteExpense.bind(this, item.id)}
              id={item.id}
              description={item.description}
              amount={item.amount}
              date={item.date}
            />
          )}
        />
      ) : (
        <View style={styles.innerContainer}>
          <Text style={styles.text}>{emptyText}</Text>
        </View>
      )}

      <DeleteBox visible={deleteBox} onCancel={onCancel} onDelete={onDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green800,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff4b",
    fontSize: 14,
    textTransform: "capitalize",
  },
});

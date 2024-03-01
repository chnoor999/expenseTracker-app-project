import { StyleSheet } from "react-native";
// compoent
import ExpenseOutput from "../../components/expense/ExpenseOutput";
// context
import { useExpenseContext } from "../../store/Expense-Context";

export default function AllExpense() {
  const { data } = useExpenseContext();

  return <ExpenseOutput expenseData={data} expensePeriod={"Total"} />;
}

const styles = StyleSheet.create({});

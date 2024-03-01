import { StyleSheet, Text, View } from "react-native";
import React from "react";
// component
import ExpenseOutput from "../../components/expense/ExpenseOutput";
// context
import { useExpenseContext } from "../../store/Expense-Context";
import { useDaysago } from "../../hooks/date";

export default function RecentExpense() {
  const { data } = useExpenseContext();

  // function that filter an data of last 7 days
  const recentData = data.filter((item) => {
    const ago7Days = useDaysago(30);
    return item.date > ago7Days;
  });

  return (
    <ExpenseOutput expenseData={recentData} expensePeriod={"Last 7 Days"} />
  );
}

const styles = StyleSheet.create({});

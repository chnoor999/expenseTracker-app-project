import { StyleSheet, Text, View } from "react-native";
// constant color
import { Colors } from "../../config/colors/Colors";

export default function ExpenseSummary({ expensePeriod, expense }) {
  // sum of all expense
    const totalSum = expense.reduce((sum, currentExpense) => {
      return sum + currentExpense.amount;
    }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.expensePeriod}>{expensePeriod}</Text>
      <Text style={styles.totalAmount}>${totalSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.green100,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  expensePeriod: {
    fontSize: 16,
    color: Colors.green700,
  },
  totalAmount: {
    fontSize: 16,
    color: Colors.green700,
    fontFamily: "robotoBold",
  },
});

import { FlatList, StyleSheet, View } from "react-native";
// constant colors
import { Colors } from "../../config/colors/Colors";
// component
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";

export default function ExpenseOutput({ expensePeriod, expenseData }) {
  return (
    <View style={styles.container}>
      <ExpenseSummary expensePeriod={expensePeriod} expense={expenseData} />
      <FlatList
        data={expenseData}
        renderItem={({ item }) => (
          <ExpenseList
            description={item.description}
            amount={item.amount}
            date={item.date}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green800,
  },
});

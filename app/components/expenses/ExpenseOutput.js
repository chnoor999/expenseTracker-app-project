import { FlatList, StyleSheet, View } from "react-native";
import { memo, useCallback } from "react";
import { Colors } from "../../config/colors/Colors";
import { useNavigation } from "@react-navigation/native";

import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import ErrorOverlay from "../UI/ErrorOverlay";

const ExpenseOutput = ({
  expensePeriod,
  expenseData,
  emptyText,
  swapButton,
}) => {
  const navigation = useNavigation();

  const onListLongPressHandler = useCallback((id) => {
    navigation.navigate("deleteBox", { id });
  }, []);

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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExpenseList
              onLongPress={() => onListLongPressHandler(item.id)}
              item={item}
            />
          )}
        />
      ) : (
        <ErrorOverlay message={emptyText} />
      )}
    </View>
  );
};

export default memo(ExpenseOutput);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green800,
  },
});

import { StyleSheet, Text, View } from "react-native";
import { memo, useMemo } from "react";
import { Colors } from "../../config/colors/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ExpenseSummary = ({ expensePeriod, expense, swapButton }) => {
  // sum of all expense
  const totalSum = useMemo(
    () =>
      expense.reduce((sum, currentExpense) => {
        return sum + currentExpense.amount;
      }, 0),
    [expense]
  );

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.txt}>{expensePeriod}</Text>
        {swapButton}
      </View>
      <Text style={[styles.txt, styles.totalAmount]}>
        ${totalSum.toFixed(2)}
      </Text>
    </View>
  );
};

export default memo(ExpenseSummary);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.green100,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    marginHorizontal: wp(2),
    marginVertical: hp(1.5),
  },
  summaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    color: Colors.green700,
    fontFamily: "roboto",
    fontSize: hp(1.9),
  },
  totalAmount: {
    fontFamily: "robotoBold",
  },
});

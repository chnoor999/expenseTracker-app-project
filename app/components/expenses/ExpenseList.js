import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// constant colors
import { Colors } from "../../config/colors/Colors";
// formate date hook
import { useFormatDate } from "../../hooks/date";

export default function ExpenseList({ description, date, amount }) {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.detailBox}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.data}>{useFormatDate(date)}</Text>
        </View>
        <View style={styles.amountbox}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal:10,
    marginBottom:10,
    borderRadius: 6,
    padding: 10,
    backgroundColor: Colors.green700,
  },
  description: {
    fontSize: 16,
    fontFamily: "robotoBold",
    color: "#fff",
    marginBottom: 5,
  },
  data: {
    fontSize: 14,
    color: "#ffffffac",
  },
  amountbox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: Colors.green100,
    minWidth: 100,
    borderRadius: 6,
  },
  amount: {
    fontSize: 18,
    fontFamily: "robotoBold",
    color: Colors.green700,
  },
});

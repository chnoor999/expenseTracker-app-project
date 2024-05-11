import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../config/colors/Colors";
import { useFormatDate } from "../../hooks/date";
import { useNavigation } from "@react-navigation/native";
import { memo } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ExpenseList = ({ onLongPress, item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate("manageExpense", { id: item.id });
      }}
      onLongPress={onLongPress}
    >
      <View style={styles.container}>
        <View style={styles.detailBox}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.date}>{useFormatDate(item.date)}</Text>
        </View>
        <View style={styles.amountBox}>
          <Text style={styles.amount}>{item.amount.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ExpenseList);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.green700,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.6),
    marginHorizontal: wp(3.5),
    marginBottom: hp(1),
    borderRadius: 6,
  },
  description: {
    fontSize: hp(1.85),
    fontFamily: "robotoBold",
    color: "#fff",
    marginBottom: 5,
    width: wp(50),
  },
  date: {
    fontSize: hp(1.6),
    color: "#ffffffac",
    fontFamily: "roboto",
  },
  amountBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.green100,
    borderRadius: 6,
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    width: wp(30),
  },
  amount: {
    fontSize: hp(1.95),
    fontFamily: "robotoBold",
    color: Colors.green700,
  },
});

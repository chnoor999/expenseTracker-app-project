import React, { useState } from "react";
// component
import ExpenseOutput from "../../components/expenses/ExpenseOutput";
// context
import { useExpenseContext } from "../../store/Expense-Context";
import { useDaysago } from "../../hooks/date";
// constant color
import { Colors } from "../../config/colors/Colors";
// icons
import { FontAwesome } from "@expo/vector-icons";

export default function RecentExpense() {
  const { data } = useExpenseContext();

  // state for how many days ago i want to list the expense
  const [daysAgo, setdaysAgo] = useState(7);
  // chnag 7days ago to 30 days ago toggle
  const toggleDaysAgo = () => {
    setdaysAgo((pre) => (pre == 7 ? 30 : 7));
  };

  // function that filter an data of last 7 days
  const recentData = data.filter((item) => {
    const ago7Days = useDaysago(daysAgo);
    return item.date > ago7Days;
  });

  return (
    <ExpenseOutput
      expenseData={recentData}
      expensePeriod={`Last ${daysAgo} Days`}
      emptyText={"No recent expenses recorded."}
      swapButton={
        <FontAwesome
          onPress={toggleDaysAgo}
          name="exchange"
          size={16}
          color={Colors.green700}
          style={{ width: 30, textAlign: "center" }}
        />
      }
    />
  );
}


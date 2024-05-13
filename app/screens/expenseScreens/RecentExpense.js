import { useCallback, useMemo, useState } from "react";
import { useExpenseContext } from "../../store/Expense-Context";
import { useDaysAgo } from "../../hooks/date";
import { Colors } from "../../config/colors/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import ExpenseOutput from "../../components/expenses/ExpenseOutput";
import ButtonWithIcon from "../../components/UI/ButtonWithIcon";

export default function RecentExpense() {
  const { data } = useExpenseContext();

  const [daysAgo, setDysAgo] = useState(7);

  const toggleDays = useCallback(() => {
    setDysAgo((pre) => (pre == 7 ? 30 : 7));
  }, []);

  const recentData = useMemo(
    () =>
      data.filter((item) => {
        const agoDaysDateObj = useDaysAgo(daysAgo);
        return item.date > agoDaysDateObj;
      }),
    [data, daysAgo]
  );

  return (
    <ExpenseOutput
      expenseData={recentData}
      expensePeriod={`Last ${daysAgo} Days`}
      emptyText={"No recent expenses recorded."}
      swapButton={
        <ButtonWithIcon
          FontAwesomeIcon
          name="exchange"
          size={hp(2)}
          color={Colors.green700}
          onPress={toggleDays}
        />
      }
    />
  );
}

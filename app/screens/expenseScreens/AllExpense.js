import { Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useExpenseContext } from "../../store/Expense-Context";
import { Colors } from "../../config/colors/Colors";
import { getExpense } from "../../hooks/axios";
import { useAuthContext } from "../../store/Auth-Context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import IconButton from "../../components/UI/Icons";
import FilterBox from "../../components/UI/FilterBox";
import ExpenseOutput from "../../components/expenses/ExpenseOutput";
import Dot from "../../components/UI/Dot";
import LoadingOverLay from "../../components/UI/LoadingOverLay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import ButtonWithIcon from "../../components/UI/ButtonWithIcon";

export default function AllExpense() {
  const { data, set } = useExpenseContext();
  const { token, userUid } = useAuthContext();

  // state for filter box visible or not
  const [filterVisible, setFilterVisible] = useState(false);
  // date for filter state
  const [date, setDate] = useState({ value: "", isValid: true });

  const handleDateChange = (text) => {
    setDate((prev) => ({ ...prev, value: text }));
  };

  const handleFilter = () => {
    setFilterVisible(true);
  };

  // function for box filter cancel
  const onCancel = () => {
    setFilterVisible(false);
  };

  const onApply = () => {
    const dateObj = new Date(date.value);
    const dateIsValid = dateObj.toString() !== "Invalid Date";

    if (dateIsValid) {
      const filtered = data.filter((item) => {
        return (
          item.date.toISOString().slice(0, 10) ===
          dateObj.toISOString().slice(0, 10)
        );
      });

      setDATATOSHOW(filtered);
      setFilterVisible(false);
      setDate((pre) => ({ ...pre, isValid: true }));
    } else {
      setDate((pre) => ({ ...pre, isValid: false }));
    }
  };

  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState();

  // fetch expense from firebase
  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const data = await getExpense(token, userUid);
        const arr = [];
        for (const key in data) {
          const obj = {
            ...data[key],
            date: new Date(data[key].date),
          };
          arr.push(obj);
        }
        set(arr.reverse());
        setIsFetched(true);
      } catch (error) {
        setError("Failed to fetch expenses try again later.");
      }
    })();
  }, [token, userUid]);

  if (!isFetched && error?.length) {
    return <ErrorOverlay message={error} />;
  }

  if (!isFetched) {
    return <LoadingOverLay />;
  }

  return (
    <>
      <ExpenseOutput
        swapButton={
          <ButtonWithIcon
            name={"filter-sharp"}
            size={hp(2)}
            color={Colors.green700}
            onPress={handleFilter}
          />
          // <Pressable onPress={handleFilter}>
          //   <IconButton
          //     name={"filter-sharp"}
          //     size={16}
          //     color={Colors.green700}
          //   />
          //   {/* this custom dot is still over
          //   the filter button if the filter is appliead */}
          //   {date.value && <Dot />}
          // </Pressable>
        }
        expenseData={data}
        expensePeriod={"Total"}
        emptyText={
          date.value
            ? "No expenses found for selected date"
            : "There are no expenses recorded."
        }
      />
      <FilterBox
        visible={filterVisible}
        onCancel={onCancel}
        date={date}
        handleDateChange={handleDateChange}
        onApply={onApply}
      />
    </>
  );
}

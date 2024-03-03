import { StyleSheet } from "react-native";
// component
import ExpenseOutput from "../../components/expenses/ExpenseOutput";
// context
import { useExpenseContext } from "../../store/Expense-Context";
//icons
import IconButton from "../../components/UI/IconButton";
import { Colors } from "../../config/colors/Colors";
import FilterBox from "../../components/UI/FilterBox";
import { useEffect, useState } from "react";
import Dot from "../../components/UI/Dot";

export default function AllExpense() {
  const { data } = useExpenseContext();
  const [DATATOSHOW, setDATATOSHOW] = useState(data);

  useEffect(() => {
    setDATATOSHOW(data);
  }, [data]);

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
    setDate((prev) => ({ ...prev, value: "" }));
    setDATATOSHOW(data);
    setDate((pre) => ({ ...pre, isValid: true }));
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

  return (
    <>
      <ExpenseOutput
        swapButton={
          <>
            <IconButton
              onPress={handleFilter}
              name={"filter-sharp"}
              size={18}
              color={Colors.green700}
              style={{ width: 30, textAlign: "center", padding: 0 }}
            />
            {/* this custom dot is still over 
            the filter button if the filter is appliead */}
            {date.value && <Dot />}
          </>
        }
        expenseData={DATATOSHOW}
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

const styles = StyleSheet.create({});

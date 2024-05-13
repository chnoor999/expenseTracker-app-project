import { useCallback, useEffect, useState } from "react";
import { useExpenseContext } from "../../store/Expense-Context";
import { Colors } from "../../config/colors/Colors";
import { getExpense } from "../../hooks/axios";
import { useAuthContext } from "../../store/Auth-Context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import FilterBox from "../../components/UI/FilterBox";
import ExpenseOutput from "../../components/expenses/ExpenseOutput";
import LoadingOverLay from "../../components/UI/LoadingOverLay";
import ErrorOverlay from "../../components/UI/ErrorOverlay";
import ButtonWithIcon from "../../components/UI/ButtonWithIcon";

export default function AllExpense() {
  const { data, set } = useExpenseContext();
  const { token, userUid } = useAuthContext();

  const [filterVisible, setFilterBoxVisible] = useState(false);
  const [filteredData, setFilteredData] = useState({
    showFilteredData: false,
    data: [],
  });

  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState();

  const toggleFilterBox = useCallback(() => {
    setFilterBoxVisible(true);
  }, []);

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
            IoniconsIcon
            name={"filter-sharp"}
            size={hp(2)}
            color={Colors.green700}
            onPress={toggleFilterBox}
            active={filteredData.showFilteredData}
          />
        }
        expenseData={filteredData.showFilteredData ? filteredData.data : data}
        expensePeriod={"Total"}
        emptyText={
          filteredData.showFilteredData
            ? "No expenses found for selected date"
            : "There are no expenses recorded."
        }
      />
      <FilterBox
        visible={filterVisible}
        setFilterBoxVisible={setFilterBoxVisible}
        setFilteredData={setFilteredData}
      />
    </>
  );
}

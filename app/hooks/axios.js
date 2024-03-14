// managing expense in firbase
import axios from "axios";

const BASEURL = "https://expensetracker-7c464-default-rtdb.firebaseio.com";

// this hook post an expense
export const postExpense = async (token, userUid, expenseData) => {
  const id = await axios.post(
    BASEURL + `/expense/${userUid}.json?auth=${token}`,
    expenseData
  );
  return id.data.name;
};

// this hook get an expenses
export const getExpense = async (token, userUid) => {
  const response = await axios.get(
    BASEURL + `/expense/${userUid}.json?auth=${token}`
  );

  const arr = [];
  for (const key in response.data) {
    const obj = {
      id: key,
      ...response.data[key],
    };
    arr.push(obj);
  }
  return arr;
};

// hook for edit an expense
export const editExpense = async (token, userUid, id, expenseData) => {
  return axios.put(
    BASEURL + `/expense/${userUid}/${id}.json?auth=${token}`,
    expenseData
  );
};

// hook for delete an expense
export const delExpense = async (token, userUid, id) => {
  return axios.delete(BASEURL + `/expense/${userUid}/${id}.json?auth=${token}`);
};

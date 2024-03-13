// managing expense in firbase
import axios from "axios";

const BASEURL = "https://expensetracker-7c464-default-rtdb.firebaseio.com";

// this hook post an expense
export const postExpense = async (expenseData) => {
  const id = await axios.post(BASEURL + `/expense.json`, expenseData);
  return id.data.name;
};

// this hook get an expenses
export const getExpense = async () => {
  const response = await axios.get(BASEURL + "/expense.json");

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
export const editExpense = async (id, expenseData) => {
  return axios.put(BASEURL + `/expense/${id}.json`, expenseData);
};

// hook for delete an expense
export const delExpense = async (id) => {
  return axios.delete(BASEURL + `/expense/${id}.json`);
};

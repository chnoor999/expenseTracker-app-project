import { createContext, useContext, useReducer } from "react";

export const ExpenseContext = createContext({
  data: [],
  add: (expnese) => {},
  deleteExpense: (id) => {},
  edit: (id, expense) => {},
});

const DUMMYDATA = [];

export const ExpenseContextProvider = ({ children }) => {
  const expenseReducer = (state, action) => {
    switch (action.type) {
      case "add":
        return [
          {
            id: new Date() + Math.random() * 1000,
            ...action.payload,
          },
          ...state,
        ];
      case "delete":
        return state.filter((item) => item.id != action.id);
      case "edit":
        return state.map((item) => {
          if (item.id == action.id) {
            return {
              ...item,
              ...action.payload,
            };
          } else {
            return item;
          }
        });
      default:
        return state;
    }
  };
  const [expenseState, expenseDispatch] = useReducer(expenseReducer, DUMMYDATA);

  const value = {
    data: expenseState,
    add: (payload) => {
      expenseDispatch({ type: "add", payload });
    },
    deleteExpense: (id) => {
      expenseDispatch({ type: "delete", id });
    },
    edit: (id, payload) => {
      expenseDispatch({ type: "edit", id, payload });
    },
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  return useContext(ExpenseContext);
};

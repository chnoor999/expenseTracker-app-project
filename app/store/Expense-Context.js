import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export const ExpenseContext = createContext({
  data: [],
  set: (expense) => {},
  add: (expnese) => {},
  deleteExpense: (id) => {},
  edit: (id, expense) => {},
});

export const ExpenseContextProvider = ({ children }) => {
  const intialState = [];

  const expenseReducer = (state, action) => {
    switch (action.type) {
      case "add":
        return [
          {
            ...action.payload,
          },
          ...state,
        ];
      case "set":
        return action.payload;
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
  const [expenseState, expenseDispatch] = useReducer(
    expenseReducer,
    intialState
  );

  const value = {
    data: expenseState,
    set: (payload) => {
      expenseDispatch({ type: "set", payload });
    },
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

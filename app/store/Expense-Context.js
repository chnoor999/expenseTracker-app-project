import { createContext, useContext } from "react";

export const ExpenseContext = createContext({
  data: [],
});

const DUMMYDATA = [
  {
    id: "m1",
    description: "Story book",
    amount: 5.22,
    date: new Date(),
  },
  {
    id: "m2",
    description: "Notebook",
    amount: 3.5,
    date: new Date(),
  },
  {
    id: "m3",
    description: "Pen",
    amount: 1.2,
    date: new Date(),
  },
  {
    id: "m4",
    description: "Pencil",
    amount: 0.8,
    date: new Date(),
  },
  {
    id: "m5",
    description: "Backpack",
    amount: 20.0,
    date: new Date(),
  },
  {
    id: "m6",
    description: "Water bottle",
    amount: 2.5,
    date: new Date(),
  },
  {
    id: "m7",
    description: "Lunch box",
    amount: 4.0,
    date: new Date(),
  },
  {
    id: "m8",
    description: "Calculator",
    amount: 7.99,
    date: new Date(),
  },
];

export const ExpenseContextProvider = ({ children }) => {
  const value = {
    data: DUMMYDATA,
  };
  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  return useContext(ExpenseContext);
};

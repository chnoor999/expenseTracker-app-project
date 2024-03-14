import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
  token: "",
  userUid: "",
  userEmail: "",
  addToken: () => {},
  removeToken: () => {},
  addUserId: () => {},
  removeUserId: () => {},
  addUserEmail: () => {},
  removeUserEmail: () => {},
  isAuthenticated: "",
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userUid, setUserUid] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const addToken = (a) => {
    setToken(a);
    AsyncStorage.setItem("token", a);
  };
  const removeToken = async () => {
    await AsyncStorage.removeItem("token");
    setToken("");
  };

  const addUserId = (a) => {
    AsyncStorage.setItem("userUid", a);
    setUserUid(a);
  };
  const removeUserId = async (a) => {
    await AsyncStorage.removeItem("userUid");
    setUserUid("");
  };

  const addUserEmail = async (a) => {
    await AsyncStorage.setItem("userEmail", a);
    setUserEmail(a);
  };
  const removeUserEmail = async () => {
    await AsyncStorage.removeItem("userEmail");
    setUserEmail("");
  };

  const value = {
    token,
    userUid,
    userEmail,
    addToken,
    removeToken,
    addUserId,
    removeUserId,
    addUserEmail,
    removeUserEmail,
    isAuthenticated: !!(!!token && !!userUid),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
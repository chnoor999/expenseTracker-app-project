import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
  token: "",
  userUid: "",
  userEmail: "",
  expiredTime: "",
  refreshToken: "",
  addRefreshToken: () => {},
  removeRefreshToken: () => {},
  addExpiredTime: () => {},
  removeExpiredTime: () => {},
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
  const [expiredTime, setExpiredTime] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

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

  const addExpiredTime = async (a) => {
    await AsyncStorage.setItem("expiredIn", JSON.stringify(a));
    setExpiredTime(a);
  };
  const removeExpiredTime = async () => {
    await AsyncStorage.removeItem("expiredIn");
    setExpiredTime("");
  };

  const addRefreshToken = async (a) => {
    await AsyncStorage.setItem("refreshToken", a);
    setRefreshToken(a);
  };
  const removeRefreshToken = async () => {
    await AsyncStorage.removeItem("refreshToken");
    setRefreshToken("");
  };

  const value = {
    token,
    userUid,
    userEmail,
    expiredTime,
    refreshToken,
    addRefreshToken,
    removeRefreshToken,
    addExpiredTime,
    removeExpiredTime,
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

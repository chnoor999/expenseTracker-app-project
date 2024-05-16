import { createContext, useContext, useState } from "react";
import { exchangeToken } from "../hooks/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
  token: "",
  userUid: "",
  userEmail: "",
  expiredTime: "",
  refreshToken: "",
  isAuthenticated: "",
  authenticate: () => {},
  fetchInitialData: () => {},
  exchangeTokenIfExpired: () => {},
  logOutHandler: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userUid, setUserUid] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [expiredTime, setExpiredTime] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const authenticate = (data) => {
    const timeOfExpire = Date.now() + 3600 * 1000;
    AsyncStorage.setItem("expiredIn", JSON.stringify(timeOfExpire));
    setExpiredTime(timeOfExpire);
    AsyncStorage.setItem("token", data.idToken);
    setToken(data.idToken);
    AsyncStorage.setItem("userUid", data.localId);
    setUserUid(data.localId);
    AsyncStorage.setItem("userEmail", data.email);
    setUserEmail(data.email);
    AsyncStorage.setItem("refreshToken", data.refreshToken);
    setRefreshToken(data.refreshToken);
  };

  const exchangeTokenInitially = async (refreshToken) => {
    try {
      const timeOfExpire = Date.now() + 3600 * 1000;
      const data = await exchangeToken(refreshToken);
      console.log("changed");
      setExpiredTime(timeOfExpire);
      setToken(data.id_token);
      setRefreshToken(data.refresh_token);
      await AsyncStorage.multiSet([
        ["expiredIn", JSON.stringify(timeOfExpire)],
        ["token", data.id_token],
        ["refreshToken", data.refresh_token],
      ]);
    } catch (error) {
      alert("Error Occurred Try Again");
    }
  };

  const fetchInitialData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userUid = await AsyncStorage.getItem("userUid");
      const userEmail = await AsyncStorage.getItem("userEmail");
      const expiredIn = await AsyncStorage.getItem("expiredIn");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (token && userUid && userEmail && expiredIn && refreshToken) {
        if (Date.now() >= expiredIn) {
          await exchangeTokenInitially(refreshToken);
        } else {
          setToken(token);
          setExpiredTime(JSON.parse(expiredIn));
          setRefreshToken(refreshToken);
        }
        setUserUid(userUid);
        setUserEmail(userEmail);
      }
    } catch (error) {
      alert("Error while Opening App, Try Again.");
    }
  };

  const exchangeTokenIfExpired = async () => {
    if (Date.now() <= expiredTime) return;
    console.log("run for change");
    try {
      const timeOfExpire = Date.now() + 3600 * 1000;
      const data = await exchangeToken(refreshToken);
      setExpiredTime(timeOfExpire);
      setToken(data.id_token);
      setRefreshToken(data.refresh_token);
      await AsyncStorage.multiSet([
        ["expiredIn", JSON.stringify(timeOfExpire)],
        ["token", data.id_token],
        ["refreshToken", data.refresh_token],
      ]);
      return data.id_token;
    } catch (error) {
      alert("Error Occurred Try Again");
    }
  };

  const logOutHandler = async () => {
    await AsyncStorage.clear();
    setToken("");
    setUserUid("");
    setExpiredTime("");
    setRefreshToken("");
    setUserEmail("");
  };

  const value = {
    authenticate,
    fetchInitialData,
    exchangeTokenIfExpired,
    logOutHandler,
    token,
    userUid,
    userEmail,
    expiredTime,
    refreshToken,
    isAuthenticated:
      userUid && token && expiredTime && refreshToken && userEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

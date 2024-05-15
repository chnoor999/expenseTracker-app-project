import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ExpenseContextProvider } from "./app/store/Expense-Context";
import { AuthContextProvider, useAuthContext } from "./app/store/Auth-Context";
import { useFonts } from "expo-font";
import { Alert } from "react-native";
import { exchangeToken } from "./app/hooks/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpenseStack from "./app/screens/navigationScreens/authenticated/ExpenseStack";
import NetInfo from "@react-native-community/netinfo";
import AuthStack from "./app/screens/navigationScreens/unAuthenticated/AuthStack";
import LoadingOverLay from "./app/components/UI/LoadingOverLay";

const Root = () => {
  const {
    isAuthenticated,
    addToken,
    addUserId,
    addUserEmail,
    expiredTime,
    addExpiredTime,
    addRefreshToken,
    refreshToken,
  } = useAuthContext();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userUid = await AsyncStorage.getItem("userUid");
        const userEmail = await AsyncStorage.getItem("userEmail");
        const expiredIn = await AsyncStorage.getItem("expiredIn");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (token && userUid && userEmail && expiredIn && refreshToken) {
          addToken(token);
          addUserId(userUid);
          addUserEmail(userEmail);
          addExpiredTime(JSON.parse(expiredIn));
          addRefreshToken(refreshToken);
        }
        setAppIsReady(true);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  const now = Date.now();
  const isExpired = now >= expiredTime;

  useEffect(() => {
    if (expiredTime) {
      if (isExpired) {
        if (refreshToken) {
          (async () => {
            try {
              const timeOfExpire = Date.now() + 3600 * 1000;
              const data = await exchangeToken(refreshToken);
              addToken(data.id_token);
              addExpiredTime(timeOfExpire);
              console.log("exchange")
            } catch (error) {
              alert("Error Occurred Try Agian");
            }
          })();
        }
      }
    }
  }, [expiredTime, refreshToken, isExpired]);

  if (!appIsReady) {
    return <LoadingOverLay />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <ExpenseStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isConnected = state.isConnected;
      if (!isConnected) {
        Alert.alert(
          "No Internet Connection",
          "Please check your internet connection and try again.",
          [{ text: "OK" }]
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [fontLoaded] = useFonts({
    robotoBold: require("./app/config/fonts/Roboto-Bold.ttf"),
    roboto: require("./app/config/fonts/Roboto-Regular.ttf"),
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <ExpenseContextProvider>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </ExpenseContextProvider>
  );
}

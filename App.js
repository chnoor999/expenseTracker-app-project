import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ExpenseStack from "./app/screens/navigationScreens/authenticated/ExpenseStack";
import { ExpenseContextProvider } from "./app/store/Expense-Context";
import { useFonts } from "expo-font";
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";
import AuthStack from "./app/screens/navigationScreens/unAuthenticated/AuthStack";

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
      <NavigationContainer>
        {/* <ExpenseStack /> */}
        <AuthStack />
      </NavigationContainer>
    </ExpenseContextProvider>
  );
}

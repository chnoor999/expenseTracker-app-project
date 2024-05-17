import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ExpenseContextProvider } from "./app/store/Expense-Context";
import { AuthContextProvider, useAuthContext } from "./app/store/Auth-Context";
import { useFonts } from "expo-font";

import ExpenseStack from "./app/screens/navigationScreens/authenticated/ExpenseStack";
import NetInfo from "@react-native-community/netinfo";
import AuthStack from "./app/screens/navigationScreens/unAuthenticated/AuthStack";
import LoadingOverLay from "./app/components/UI/LoadingOverLay";

const Root = () => {
  const { isAuthenticated, fetchInitialData } = useAuthContext();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchInitialData();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
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

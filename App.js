// navigation
import { NavigationContainer } from "@react-navigation/native";
import StackScreen from "./app/screens/navigationScreens/StackScreen";
import { ExpenseContextProvider } from "./app/store/Expense-Context";
// custom fonts
import { useFonts } from "expo-font";

export default function App() {
  // custom fonts
  const [fontLoaded] = useFonts({
    robotoBold: require("./app/config/fonts/Roboto-Bold.ttf"),
    roboto: require("./app/config/fonts/Roboto-Regular.ttf"),
  });

  return fontLoaded ? (
    <ExpenseContextProvider>
      <NavigationContainer>
        <StackScreen />
      </NavigationContainer>
    </ExpenseContextProvider>
  ) : null;
}

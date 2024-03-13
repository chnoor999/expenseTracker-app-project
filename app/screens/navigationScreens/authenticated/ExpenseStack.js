// navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
// screens
import ManageExpense from "../../expenseScreens/ManageExpnese";
import ExpenseTab from "./ExpenseTab";
import { Colors } from "../../../config/colors/Colors";

export default function ExpenseStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.green700 },
        headerTintColor: Colors.green100,
      }}
    >
      <Stack.Screen
        name="expenseScreens"
        component={ExpenseTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="manageExpense" component={ManageExpense} />
    </Stack.Navigator>
  );
}

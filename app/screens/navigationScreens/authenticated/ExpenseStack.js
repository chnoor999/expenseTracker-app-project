import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../../../config/colors/Colors";

const Stack = createNativeStackNavigator();
import ManageExpense from "../../expenseScreens/ManageExpense";
import ExpenseTab from "./ExpenseTab";
import DeleteBox from "../../../components/UI/DeleteBox";

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
      <Stack.Screen
        name="deleteBox"
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "fade",
        }}
        component={DeleteBox}
      />
    </Stack.Navigator>
  );
}

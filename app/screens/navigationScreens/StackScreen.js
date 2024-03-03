// navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
// screens
import ManageExpense from "../expenseScreens/ManageExpnese";
import Tabscreen from "./Tabscreen";
import { Colors } from "../../config/colors/Colors";

export default function StackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.green700 },
        headerTintColor: Colors.green100,
      }}
    >
      <Stack.Screen
        name="expenseScreens"
        component={Tabscreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="manageExpense"
        component={ManageExpense}
        // options={{ animation: "slide_from_bottom" }}
      />
    </Stack.Navigator>
  );
}

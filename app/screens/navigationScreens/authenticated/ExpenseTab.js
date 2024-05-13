import { StyleSheet } from "react-native";
// navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import { useNavigation } from "@react-navigation/native";
// constant colors
import { Colors } from "../../../config/colors/Colors";
// icons
import Icons from "../../../components/UI/Icons";
// screens
import AllExpense from "../../expenseScreens/AllExpense";
import RecentExpense from "../../expenseScreens/RecentExpense";
import AccountScreen from "../../account/AccountScreen";
import ButtonWithIcon from "../../../components/UI/ButtonWithIcon";

export default function ExpenseTab() {
  const navigation = useNavigation();
  const addHandler = () => {
    navigation.navigate("manageExpense");
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.green700 },
        tabBarStyle: { backgroundColor: Colors.green700 },
        headerTintColor: Colors.green100,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.green100,
        tabBarInactiveTintColor: Colors.green800,
      }}
    >
      <Tab.Screen
        name="allExpense"
        component={AllExpense}
        options={{
          headerTitle: "All Expenses",
          tabBarIcon: ({ color }) => (
            <Icons IoniconsIcon name={"calendar"} color={color} size={24} />
          ),
          headerRight: () => (
            <ButtonWithIcon
              name={"add"}
              size={28}
              color={Colors.green100}
              onPress={addHandler}
              IoniconsIcon
            />
          ),
        }}
      />
      <Tab.Screen
        name="recentExpense"
        component={RecentExpense}
        options={{
          headerTitle: "Recent Expenses",
          tabBarIcon: ({ color }) => (
            <Icons
              IoniconsIcon
              name={"hourglass-sharp"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="account"
        component={AccountScreen}
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <Icons IoniconsIcon name={"person"} color={color} size={24} />
          ),
          headerRight: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

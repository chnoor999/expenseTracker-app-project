// navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import { useNavigation } from "@react-navigation/native";
// constant colors
import { Colors } from "../../config/colors/Colors";
// icons
import IconButton from "../../components/UI/IconButton";
// screens
import AllExpense from "../expenseScreens/AllExpense";
import RecentExpense from "../expenseScreens/RecentExpense";
import { StyleSheet } from "react-native";

export default function Tabscreen() {
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
        headerRight: () => (
          <IconButton
            style={styles.icon}
            name={"add"}
            size={28}
            color={Colors.green100}
            onPress={addHandler}
          />
        ),
      }}
    >
      <Tab.Screen
        name="allExpense"
        component={AllExpense}
        options={{
          headerTitle: "All Expenses",
          tabBarIcon: ({ color }) => (
            <IconButton name={"calendar"} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="recentExpense"
        component={RecentExpense}
        options={{
          headerTitle: "Recent Expenses",
          tabBarIcon: ({ color }) => (
            <IconButton name={"hourglass-sharp"} color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 13,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    backgroundColor: Colors.green700,
  },
});

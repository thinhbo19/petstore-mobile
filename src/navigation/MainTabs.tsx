import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { colors } from "../constants/theme";
import type { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#fff7ed" },
        headerTitleStyle: { color: colors.foreground, fontWeight: "700" },
        tabBarActiveTintColor: colors.brand600,
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: { borderTopColor: "#fed7aa", backgroundColor: "#fff" },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
};

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import EventScreen from "../screens/EventScreen";
import ProfileScreen from "../screens/ProfileScreen";

const TabNavigator = () => {
  // Initialisations ---------------------
  const Tab = createBottomTabNavigator();

  // View --------------------------------
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: "Home",
        }}
      />

      <Tab.Screen
        name="EventTab"
        component={EventScreen}
        options={{
          title: "Events",
        }}
      />
      {/* Profile tab allowing users to view their personal information */}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import EventScreen from "../screens/EventScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import Icons from "../UI/Icons";
import EditProfileScreen from "../screens/EditProfileScreen";

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
          tabBarIcon: () => <Icons.Home />,
        }}
      />

      <Tab.Screen
        name="EventTab"
        component={EventScreen}
        options={{
          title: "Events",
          tabBarIcon: () => <Icons.Events />,
        }}
      />

      <Tab.Screen
        name="LeaderboardTab"
        component={LeaderboardScreen}
        options={{
          title: "Leaderboard",
          tabBarIcon: () => <Icons.Leaderboard />,
        }}
      />

      {/* Profile tab allowing users to view their personal information */}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: () => <Icons.Profile />,
        }}
        // this screen will be hidden and only be reached
        // the Profile screen when the user clicks on the
        // change password and user.
      />
      <Tab.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          title: "Edit Profile",
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

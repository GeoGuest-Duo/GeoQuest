import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import EventScreen from "../screens/EventScreen";

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
        </Tab.Navigator>
    );
};

export default TabNavigator;
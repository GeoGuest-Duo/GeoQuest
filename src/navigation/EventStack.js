import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventScreen from "../screens/EventScreen";
import EventDetailScreen from "../screens/EventDetailScreen";

const Stack = createNativeStackNavigator();

const EventStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Events"
        component={EventScreen}
        options={{ title: "Events" }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailScreen}
        options={{ title: "Event Details" }}
      />
    </Stack.Navigator>
  );
};

export default EventStack;

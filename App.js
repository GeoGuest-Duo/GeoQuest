import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import EventScreen from "./src/screens/EventScreen";

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "Login" }}
        />

        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{ title: "Create an account" }}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Welcome to GeoQuest" }}
        />
        <Stack.Screen
          name="EventScreen"
          component={EventScreen}
          options={{ title: "Events" }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

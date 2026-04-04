import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import EventScreen from "./src/screens/EventScreen";
import useStore from "./src/store/useStore";

const Stack = createNativeStackNavigator();

export const App = () => {
  // Initialisations ---------------------
  const loggedinUserKey = "loggedinUser";

  // State -------------------------------
  const [loggedinUser, saveLoggedinUser] = useStore(loggedinUserKey, null) // key = loggedinUser, value = null

  // View --------------------------------
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        {loggedinUser === null ? (
          // <>...</> groups multiple <Stack.Screen> components together
          <>
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
        </>  
        ) : (
        <>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: "Welcome to GeoQuest" }}s
          />
          <Stack.Screen
            name="EventScreen"
            component={EventScreen}
            options={{ title: "Events" }}>
          </Stack.Screen>
        </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

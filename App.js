import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useStore from "./src/store/useStore";
import TabNavigator from "./src/navigation/TabNavigator";
import AuthStack from "./src/navigation/AuthStack";

const Stack = createNativeStackNavigator();

export const App = () => {
  // Initialisations ---------------------
  const loggedinUserKey = "loggedinUser";

  // State -------------------------------
  const [loggedinUser, saveLoggedinUser] = useStore(loggedinUserKey, null) // key = loggedinUser, value = null

  // View --------------------------------
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {loggedinUser === null ? (
          // <>...</> groups multiple <Stack.Screen> components together
          <>
            <Stack.Screen
              name="Authentication"
              component={AuthStack}
            />
          </>  
        ) : (
        <>
          <Stack.Screen
            name="MainScreens"
            component={TabNavigator}
          />
        </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

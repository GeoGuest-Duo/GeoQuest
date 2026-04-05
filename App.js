import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import TabNavigator from "./src/navigation/TabNavigator";
import AuthStack from "./src/navigation/AuthStack";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  // Initialisations ---------------------
  // State -------------------------------
  const { user } = useContext(AuthContext);

  // View --------------------------------
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user === null ? (
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

export const App = () => {
  return (
    <AuthProvider>
      <RootNavigator/>
    </AuthProvider>
  )
}

export default App;

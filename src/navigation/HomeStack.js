import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/homeTab/HomeScreen";
import ViewCacheScreen from "../screens/homeTab/ViewCacheScreen";
import Icons from "../UI/Icons";

const HomeStack = () => {
  // Initialisations ---------------------
  const Stack = createNativeStackNavigator();

  // View --------------------------------
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />

      <Stack.Screen
        name="ViewCacheScreen"
        component={ViewCacheScreen}
        options={{ title: "View cache details " }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/homeTab/HomeScreen';
import ViewCacheScreen from '../screens/homeTab/ViewCacheScreen';
import CacheNavigationScreen from '../screens/homeTab/CacheNavigationScreen';
import LogCacheScreen from '../screens/homeTab/LogCacheScreen';
import LogSuccessScreen from '../screens/homeTab/LogSuccessScreen';

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

            <Stack.Screen
                name="CacheNavigationScreen"
                component={CacheNavigationScreen}
                options={{ title: "Navigate to the selected cache" }}
            />

            <Stack.Screen
                name="LogCacheScreen"
                component={LogCacheScreen}
                options={{ title: "Log cache" }}
            />
          
           <Stack.Screen
                name="LogSuccessScreen"
                component={LogSuccessScreen}
                options={{ title: "Successful" }}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;

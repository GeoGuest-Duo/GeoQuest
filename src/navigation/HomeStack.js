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
          screenOptions={{
              headerShown: true,
              headerBackButtonDisplayMode: "minimal",
          }}>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: "Home",
                    headerShown: false,
                 }}
            />

            <Stack.Screen
                name="ViewCacheScreen"
                component={ViewCacheScreen}
                options={{ title: "Cache Details " }}
            />

            <Stack.Screen
                name="CacheNavigationScreen"
                component={CacheNavigationScreen}
                options={{ title: "Find Cache" }}
            />

            <Stack.Screen
                name="LogCacheScreen"
                component={LogCacheScreen}
                options={{ title: "Log Cache" }}
            />
          
           <Stack.Screen
                name="LogSuccessScreen"
                component={LogSuccessScreen}
                options={{ title: "Cache Found!"}}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const HomeStack = () => {
    // Initialisations ---------------------
    const Stack = createNativeStackNavigator();

    // View --------------------------------
    return (
        <Stack.Navigator
            initialRouteName='HomeScreen'
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ title: "Home" }}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;
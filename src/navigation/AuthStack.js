import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const AuthStack = () => {
    // Initialisations ---------------------
    const Stack = createNativeStackNavigator();

    // View --------------------------------
    return (
        <Stack.Navigator
            initialRouteName='LoginScreen'
            screenOptions={{headerShown: false}}
        >
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
        </Stack.Navigator>
    );
};

export default AuthStack;
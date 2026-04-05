import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../UI/Button";
import { useContext, useState } from "react";
import useLoad from "../API/useLoad";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
    // Initialisations ---------------------
    const usersEndpoint = "https://mark0s.com/geoquest/v1/api/users?key=16gv8f";

    // State -------------------------------
    const [users, setUsers, isUsersLoading, loadUsers] = useLoad(usersEndpoint)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(AuthContext);

    // Handlers ----------------------------
    const handleLogin = async () => {
        // To validate user input
        if (!username || !password) {
        Alert.alert("Error", "Please fill all the required fields");
        return;
        }

        // Checks if the user data is loaded
        if (isUsersLoading) {
            Alert.alert("Please wait", "User data is loading")
            return
        }

        // Checks the userInput against user data
        const matchedUser = users.find(
        (user) =>
            user.UserUsername === username.trim() &&
            user.UserPassword === password.trim()
        );

        if (matchedUser) {
            console.log("Login success");
            setUser(matchedUser);
        } else {
        Alert.alert("Login Failed", "Invalid username or password");
        }
    };

    // View --------------------------------
    return (
        <View style={styles.container}>
        <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.inputField}
        />

        <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.inputField}
        />

        <Button label="Login" onClick={handleLogin} />
        <Pressable
            style={styles.signUpText}
            onPress={() => navigation.navigate("SignupScreen")}>
            <Text>Don't have an account? Sign Up</Text>
        </Pressable>
        </View>
    );
};

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputField: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    signUpText: {
        padding: 15,
    },
    });

    export default LoginScreen;

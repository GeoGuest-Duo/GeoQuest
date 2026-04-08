import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../UI/Button";
import { useState } from "react";
import useLoad from "../API/useLoad";
import { useAuth } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
    // Initialisations ---------------------
    const usersEndpoint = "https://mark0s.com/geoquest/v1/api/users?key=16gv8f";

    // State -------------------------------
    const [users, setUsers, isUsersLoading, loadUsers] = useLoad(usersEndpoint)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();       

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
            login(matchedUser)
        } else {
        Alert.alert("Login Failed", "Invalid username or password");
        }
    };

    // View --------------------------------
    return (
        <View style={styles.container}>
            <Image 
                source={require("../../assets/splash.png")} 
                style={styles.image}
            />
            <View style={styles.formContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.inputField}
                />

                <Text style={styles.label}>Password</Text>
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
        </View>
        );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    formContainer: {
        width: "80%",   // 👈 keeps everything same width
    },
    label: {
        fontSize: 18,
        fontWeight: "400",
        color: "black",
        marginBottom: 5, 
    },
    signUpText: {
        paddingTop: 18,
        alignItems: "center",
    },
    inputField: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,  
        width: "100%",  
    },
    image: {
        width: 400,
        height: 300,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 30,
    },
    });

    export default LoginScreen;

import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../UI/Button";

const LoginScreen = () => {
    // Initialisations ---------------------
    // State -------------------------------
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Handlers ----------------------------
    const handleLogin = () => {
        console.log("Username:", username)
        console.log("Password:", password)
    }

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
                style={styles.inputField}
            />

            <Button label="Login" onClick={handleLogin} />
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
    }
});

export default LoginScreen;
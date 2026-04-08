import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "../UI/Button";
import useLoad from "../API/useLoad";
import { useAuth } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  // ---------------- INITIALISATIONS ----------------
  const usersEndpoint = "https://mark0s.com/geoquest/v1/api/users?key=16gv8f";

  // ---------------- STATE ----------------
  const [users, setUsers, isUsersLoading, loadUsers] = useLoad(usersEndpoint);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  useEffect(() => {
    loadUsers();
  }, []);

  // ---------------- HANDLERS ----------------
  const handleLogin = async () => {
    // Validate user input
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill all the required fields");
      return;
    }
    if (isUsersLoading) {
      Alert.alert("Please wait", "User data is loading");
      return;
    }

    // Ensure users exist before searching
    if (!users || users.length === 0) {
      Alert.alert("Error", "Users not loaded");
      return;
    }

    // Find matching user from API data
    const matchedUser = users.find(
      (user) =>
        user.UserUsername?.trim().toLowerCase() ===
          username.trim().toLowerCase() &&
        user.UserPassword?.trim() === password.trim(),
    );

    // If match found → login user
    if (matchedUser) {
      console.log("Login success");
      login(matchedUser);
    } else {
      // If no match → show error
      Alert.alert("Login Failed", "Invalid username or password");
    }
  };

  // ---------------- VIEW ----------------
  return (
    // This Prevents keyboard from covering inputs
    <KeyboardAvoidingView style={styles.keyboardContainer}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
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
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.inputField}
          />

          <Button label="Login" onPress={handleLogin} />

          <Pressable
            style={styles.signUpText}
            onPress={() => navigation.navigate("SignupScreen")}>
            <Text>Don't have an account? Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },

  container: {
    flexGrow: 1, // allows scrolling
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 30,
  },

  formContainer: {
    width: "80%",
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

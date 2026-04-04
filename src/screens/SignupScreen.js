import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../UI/Button";
import API from "../API/API";

const SignupScreen = ({ navigation }) => {
  const endpoint = "https://mark0s.com/geoquest/v1/api/users?key=16gv8f";

  // State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");

  // Handler
  const handleSignup = async () => {
    if (!firstName || !lastName || !username || !password) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const newUser = {
      UserFirstname: firstName,
      UserLastname: lastName,
      UserPhone: phone,
      UserUsername: username,
      UserPassword: password,
      UserLatitude: 0,
      UserLongitude: 0,
      UserTimestamp: Date.now(),
      UserImageURL: imageURL || "https://placehold.co/300x300/png", // place holder image
    };

    const response = await API.post(endpoint, newUser);

    if (response.isSuccess) {
      Alert.alert("Success", "Account created!");
      navigation.navigate("LoginScreen");
    } else {
      Alert.alert("Error", response.message || "Signup failed");
    }
  };

  // View
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />

      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />

      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Image URL (optional)"
        value={imageURL}
        onChangeText={setImageURL}
        style={styles.input}
      />

      <Button label="Sign Up" onClick={handleSignup} />

      <Button
        label="Back to Login"
        onClick={() => navigation.navigate("LoginScreen")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default SignupScreen;

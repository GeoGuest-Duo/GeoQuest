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

      <View style={styles.card}>
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#777"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />

        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#777"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />

        <TextInput
          placeholder="Phone"
          placeholderTextColor="#777"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />

        <TextInput
          placeholder="Username"
          placeholderTextColor="#777"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#777"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          placeholder="Image URL (optional)"
          placeholderTextColor="#777"
          value={imageURL}
          onChangeText={setImageURL}
          style={styles.input}
        />

        <View style={styles.buttonContainer}>
          <Button label="Sign Up" onClick={handleSignup} />
        </View>

        <View style={styles.secondaryButtonContainer}>
          <Button
            label="Back to Login"
            onClick={() => navigation.navigate("LoginScreen")}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#346739",
    textAlign: "center",
    marginBottom: 24,
  },

  card: {
    backgroundColor: "#F2EDC2",
    borderRadius: 22,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333333",
    marginBottom: 12,
  },

  buttonContainer: {
    marginTop: 6,
    marginBottom: 10,
  },

  secondaryButtonContainer: {
    marginTop: 2,
  },
});

export default SignupScreen;

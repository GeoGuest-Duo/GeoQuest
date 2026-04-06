// Import React and hooks
import React, { useState } from "react";

// Import React Native components
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";

// Import custom Button component
import { Button } from "../UI/Button";

// Import authentication context (gives access to user + update function)
import { useAuth } from "../context/AuthContext";

// Main screen component
const EditProfileScreen = ({ route, navigation }) => {
  // ---------------- INITIALISATIONS ----------------

  // Get mode from navigation params (either "username" or "password")
  const { mode } = route.params;

  // Get current user data and update function from context
  const { user, updateUser } = useAuth();

  // ---------------- STATE ----------------

  // Username state (pre-filled with current username)
  const [username, setUsername] = useState(user?.UserUsername || "");

  // Password-related states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Loading state for showing spinner during API calls
  const [loading, setLoading] = useState(false);

  // ---------------- HANDLERS ----------------

  // Function triggered when user presses "Save Changes"
  const handleSave = async () => {
    // ===== USERNAME UPDATE =====
    if (mode === "username") {
      // Validation: ensure username is not empty
      if (!username.trim()) {
        Alert.alert("Error", "Username cannot be empty.");
        return;
      }

      // Validation: prevent same username
      if (username.trim() === user?.UserUsername) {
        Alert.alert("Info", "Please enter a different username.");
        return;
      }

      try {
        // Show loading spinner
        setLoading(true);

        // Create updated user object
        const updatedUser = {
          ...user,
          UserUsername: username.trim(),
        };

        // Send PUT request to API
        const response = await fetch(
          `https://mark0s.com/geoquest/v1/api/users/${user.UserID}?key=16gv8f`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          },
        );

        // Read response as text for debugging
        const rawText = await response.text();

        console.log("Username update status:", response.status);
        console.log("Username update response:", rawText);

        // If request failed → throw error
        if (!response.ok) {
          throw new Error(rawText || "Failed to update username.");
        }

        // Update user in global context
        if (updateUser) {
          updateUser(updatedUser);
        }

        // Show success message
        Alert.alert("Success", "Username updated successfully.");

        // Go back to previous screen
        navigation.goBack();
      } catch (error) {
        // Show error message
        Alert.alert("Error", error.message || "Something went wrong.");
      } finally {
        // Stop loading spinner
        setLoading(false);
      }
    }

    // ===== PASSWORD UPDATE =====
    else if (mode === "password") {
      // Validation: all fields must be filled
      if (!currentPassword || !newPassword || !confirmPassword) {
        Alert.alert("Error", "Please fill all fields.");
        return;
      }

      // Validation: check current password
      if (currentPassword !== user?.UserPassword) {
        Alert.alert("Error", "Current password is incorrect.");
        return;
      }

      // Validation: minimum password length
      if (newPassword.length < 4) {
        Alert.alert("Error", "New password must be at least 4 characters.");
        return;
      }

      // Validation: passwords must match
      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }

      // Validation: prevent same password
      if (newPassword === currentPassword) {
        Alert.alert("Error", "New password must be different.");
        return;
      }

      try {
        // Show loading spinner
        setLoading(true);

        // Create updated user object
        const updatedUser = {
          ...user,
          UserPassword: newPassword,
        };

        // Send PUT request to API
        const response = await fetch(
          `https://mark0s.com/geoquest/v1/api/users/${user.UserID}?key=16gv8f`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          },
        );

        // Read response
        const rawText = await response.text();

        console.log("Password update status:", response.status);
        console.log("Password update response:", rawText);

        // Handle failed request
        if (!response.ok) {
          throw new Error(rawText || "Failed to update password.");
        }

        // Update user in context
        if (updateUser) {
          updateUser(updatedUser);
        }

        // Success alert
        Alert.alert("Success", "Password updated successfully.");

        // Navigate back
        navigation.goBack();
      } catch (error) {
        // Show error
        Alert.alert("Error", error.message || "Something went wrong.");
      } finally {
        // Stop loading spinner
        setLoading(false);
      }
    }
  };

  // ---------------- VIEW ----------------

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        {/* Title changes based on mode */}
        <Text style={styles.title}>
          {mode === "username" ? "Change Username" : "Change Password"}
        </Text>

        {/* USERNAME FORM */}
        {mode === "username" ? (
          <View style={styles.card}>
            {/* Display current username */}
            <Text style={styles.label}>Current Username</Text>
            <Text style={styles.currentValue}>@{user?.UserUsername}</Text>

            {/* Input for new username */}
            <Text style={styles.label}>New Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter new username"
              autoCapitalize="none"
            />
          </View>
        ) : (
          // PASSWORD FORM
          <View style={styles.card}>
            {/* Current password */}
            <Text style={styles.label}>Current Password</Text>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              secureTextEntry
            />

            {/* New password */}
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry
            />

            {/* Confirm password */}
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              secureTextEntry
            />
          </View>
        )}

        {/* SAVE BUTTON */}
        <View style={styles.buttonWrapper}>
          {loading ? (
            // Show spinner while loading
            <ActivityIndicator size="large" />
          ) : (
            <Button
              label="Save Changes"
              onClick={handleSave}
              styleButton={styles.fullWidthButton}
            />
          )}
        </View>

        {/* CANCEL BUTTON */}
        <View style={styles.buttonWrapper}>
          <Button
            label="Cancel"
            onClick={() => navigation.goBack()}
            styleButton={styles.fullWidthButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  // Scroll container styling
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  // Main container
  container: {
    flex: 1,
  },

  // Title text
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#111",
  },

  // Card container (form box)
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#fafafa",
  },

  // Label text
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "600",
    color: "#111",
  },

  // Current username display
  currentValue: {
    marginBottom: 16,
    color: "#555",
    fontSize: 16,
  },

  // Input fields
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
  },

  // Button container
  buttonWrapper: {
    marginTop: 10,
    width: "100%",
  },

  // Full-width button style
  fullWidthButton: {
    width: "100%",
  },
});

export default EditProfileScreen;

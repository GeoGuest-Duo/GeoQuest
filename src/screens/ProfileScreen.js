import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "../UI/Button";
import { useAuth } from "../context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  // Initialisations ---------------------

  // State -------------------------------
  // user = current logged-in user
  const { user, logout } = useAuth();

  // View --------------------------------
  return (
    <View style={styles.container}>
      {/* Screen title */}
      <Text style={styles.title}>My Profile</Text>

      {/* Profile card displaying image and basic user info */}
      <View style={styles.card}>
        {/* Display user profile image if available */}
        {user?.UserImageURL ? (
          <Image source={{ uri: user.UserImageURL }} style={styles.avatar} />
        ) : null}

        {/* Display user's full name */}
        <Text style={styles.name}>
          {user?.UserFirstname} {user?.UserLastname}
        </Text>

        {/* Display username */}
        <Text style={styles.username}>@{user?.UserUsername}</Text>
      </View>

      {/* User statistics such as points, finds, and events */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text>Points</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text>Finds</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text>Events</Text>
        </View>
      </View>

      {/* Navigation buttons allowing the user to access core app features */}
      <View style={styles.buttons}>
        {/* Navigate to Events tab */}
        <Button
          label="View Events"
          onClick={() => navigation.navigate("EventTab")}
        />

        {/* Logout button - clears stored user and returns to login */}
        <Button label="Logout" onClick={() => logout()} />
      </View>
    </View>
  );
};

// Styles -------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  username: {
    color: "gray",
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  statBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    minWidth: 90,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttons: {
    width: "100%",
    gap: 10,
  },
});

export default ProfileScreen;

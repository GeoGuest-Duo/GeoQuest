import { StyleSheet, Text, View } from "react-native";
import { Button } from "../UI/Button";
import useStore from "../store/useStore";

const HomeScreen = ({ navigation }) => {
  // Initialisations ---------------------
  // Retrieve the logged-in user from AsyncStorage
  const [user] = useStore("loggedinUser", null);

  // View --------------------------------
  return (
    <View style={styles.container}>
      {/* Main welcome title */}
      <Text style={styles.title}>Welcome to GeoQuest</Text>

      {/* Personalised greeting using user's first name */}
      <Text style={styles.subtitle}>
        Hi {user?.UserFirstname}, ready to start your treasure hunt?
      </Text>

      {/* Navigation buttons for key features */}
      <View style={styles.buttons}>
        {/* Navigate to Map screen */}
        <Button
          label="Open Map"
          onClick={() => navigation.navigate("MapScreen")}
        />

        {/* Navigate to Profile tab */}
        <Button
          label="View Profile"
          onClick={() => navigation.navigate("ProfileTab")}
        />
      </View>
    </View>
  );
};

// Styles -------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // vertically center content
    alignItems: "center", // horizontally center content
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 30,
  },

  buttons: {
    width: "100%",
    gap: 10,
  },
});

export default HomeScreen;

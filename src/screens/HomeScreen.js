import { StyleSheet, Text, View } from "react-native";
import { Button } from "../UI/Button";
import useStore from "../store/useStore";

const HomeScreen = ({ navigation }) => {
  // Initialisations ---------------------
  // Retrieve logged-in user from AsyncStorage
  const [user] = useStore("loggedinUser", null);

  // View --------------------------------
  return (
    <View style={styles.container}>
      {/* Main welcome title */}
      <Text style={styles.title}>Welcome to GeoQuest</Text>

      {/* Personalised greeting using logged-in user's first name */}
      <Text style={styles.subtitle}>
        Hi {user?.UserFirstname}, here are nearby caches.
      </Text>

      {/* Map preview section (placeholder for now) */}
      {/* Later this will be replaced with a real map component */}
      <View style={styles.mapBox}>
        <Text style={styles.mapPlaceholder}>
          Map preview showing nearby caches
        </Text>
      </View>

      {/* Nearby caches section */}
      {/* Displays a simple list of nearby cache names */}
      {/* Later this can be replaced with real API data */}
      <View style={styles.cacheList}>
        <Text style={styles.sectionTitle}>Nearby Caches</Text>

        <Text style={styles.cacheItem}>• Riverside Cache</Text>
        <Text style={styles.cacheItem}>• Hidden Oak Cache</Text>
        <Text style={styles.cacheItem}>• Campus Corner Cache</Text>
      </View>

      {/* Button to navigate to full interactive map screen */}
      <View style={styles.buttons}>
        <Button
          label="Open Full Map"
          onClick={() => navigation.navigate("MapScreen")}
        />
      </View>
    </View>
  );
};

// Styles -------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },

  mapBox: {
    height: 220,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f8f8f8",
  },

  mapPlaceholder: {
    color: "gray",
  },

  cacheList: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  cacheItem: {
    fontSize: 15,
    marginBottom: 6,
  },

  buttons: {
    gap: 10,
  },
});

export default HomeScreen;

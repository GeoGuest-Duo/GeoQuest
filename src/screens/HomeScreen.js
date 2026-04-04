import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Button } from "../UI/Button";
import useStore from "../store/useStore";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const HomeScreen = ({ navigation }) => {
  // Get the logged-in user from storage
  const [user] = useStore("loggedinUser", null);

  // Store the user's current location
  const [location, setLocation] = useState(null);

  // Store any error message
  const [errorMessage, setErrorMessage] = useState("");

  // Request location permission and get current GPS location
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMessage("Location permission denied.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {/* Welcome title */}
      <Text style={styles.title}>Welcome to GeoQuest</Text>

      {/* Personal greeting */}
      <Text style={styles.subtitle}>
        Hi {user?.UserFirstname}, here is your current location.
      </Text>

      {/* Small map preview */}
      <View style={styles.mapContainer}>
        {errorMessage ? (
          <Text>{errorMessage}</Text>
        ) : !location ? (
          <ActivityIndicator size="large" />
        ) : (
          <MapView
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}>
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="You are here"
            />
          </MapView>
        )}
      </View>

      {/* Navigation buttons */}
      <View style={styles.buttons}>
        <Button
          label="Open Full Map"
          onClick={() => navigation.navigate("MapScreen")}
        />
        <Button
          label="View Profile"
          onClick={() => navigation.navigate("ProfileTab")}
        />
      </View>
    </View>
  );
};

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
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  mapContainer: {
    height: 250,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttons: {
    gap: 10,
  },
});

export default HomeScreen;

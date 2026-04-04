import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = () => {
  // State -------------------------------
  // Stores user's GPS location
  const [location, setLocation] = useState(null);

  // Stores permission or loading errors
  const [errorMessage, setErrorMessage] = useState("");

  // Temporary cache data (replace with API later)
  const caches = [
    {
      id: 1,
      name: "Riverside Cache",
      description: "A nearby hidden cache",
      latitude: 51.5075,
      longitude: -0.5815,
    },
    {
      id: 2,
      name: "Campus Corner Cache",
      description: "Treasure near campus",
      latitude: 51.5062,
      longitude: -0.5798,
    },
  ];

  // Effect ------------------------------
  // Request location permission and get current GPS position
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

  // Loading / Error handling ------------
  if (errorMessage) {
    return (
      <View style={styles.centerContainer}>
        <Text>{errorMessage}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  // View --------------------------------
  return (
    <View style={styles.container}>
      {/* Interactive map centered on user's location */}
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}>
        {/* Marker for user's current position */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You are here"
        />

        {/* Markers for nearby caches */}
        {caches.map((cache) => (
          <Marker
            key={cache.id}
            coordinate={{
              latitude: cache.latitude,
              longitude: cache.longitude,
            }}
            title={cache.name}
            description={cache.description}
          />
        ))}
      </MapView>
    </View>
  );
};

// Styles -------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
  },

  map: {
    flex: 1,
  },
});

export default MapScreen;

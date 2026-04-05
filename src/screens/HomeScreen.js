import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
//import { Button } from "../UI/Button";
import useStore from "../store/useStore";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const HomeScreen = ({ navigation }) => {
  // Initialisations ---------------------
  const cachesEndpoint = "https://mark0s.com/geoquest/v1/api/caches?key=16gv8f";  // GeoQuest API endpoint for caches
  
  // State -------------------------------
  // Get the logged-in user from storage
  const [user] = useStore("loggedinUser", null); 
  
  // Store the user's current location
  const [location, setLocation] = useState(null);   

  // Store all caches loaded from the GeoQuest API
  const [caches, setCaches] = useState([]);   

  // Store cache loading state
  const [isLoadingCaches, setIsLoadingCaches] = useState(true); 

  // Store any error message
  const [errorMessage, setErrorMessage] = useState("");   

  // Effect ------------------------------
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

  // Load caches from the GeoQuest API
  useEffect(() => {
    const loadCaches = async () => {
      try {
        const response = await fetch(cachesEndpoint);
        const data = await response.json();
        setCaches(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Error loading caches:", error);
        setErrorMessage("Unable to load caches.");
      } finally {
        setIsLoadingCaches(false);
      }
    };

    loadCaches();
  }, []);

  // Loading / error states --------------
    if (errorMessage) {
      return (
        <View style={styles.centerContainer}>
          <Text>{errorMessage}</Text>
        </View>
      );
    }
  
    if (!location || isLoadingCaches) {
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
      {/* Welcome title */}
      <Text style={styles.title}> Hi {user?.UserFirstname}, ready for an adventure?</Text>

      {/* Full interactive map centered on the user's current location */}
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation={true}>
        
        {/* Marker showing the user's current location */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You are here"
          description="Your current GPS position"
        />

        {/* Markers for all caches loaded from the API */}
        {caches.map((cache) => (
          <Marker
            key={cache.CacheID}
            coordinate={{
              latitude: cache.CacheLatitude,
              longitude: cache.CacheLongitude,
            }}
            title={cache.CacheName}
            description={cache.CacheDescription}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 8,
    textAlign: "center",
  },
  map: {
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
});

export default HomeScreen;

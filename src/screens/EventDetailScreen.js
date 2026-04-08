import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import * as Location from "expo-location";

const EventDetailScreen = ({ route }) => {
  const { event } = route.params;

  // State to store calculated distance
  const [distance, setDistance] = useState(null);

  // State to control loading spinner while calculating distance
  const [loadingDistance, setLoadingDistance] = useState(true);

  // Run distance calculation when screen loads
  useEffect(() => {
    getDistanceToEvent();
  }, []);

  // ---------------- GET USER LOCATION + CALCULATE DISTANCE ----------------
  const getDistanceToEvent = async () => {
    try {
      // Ask user for permission to access location (GPS)
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location permission is needed to show how far the event is.",
        );
        setLoadingDistance(false);
        return;
      }

      // Get user's current GPS position
      const location = await Location.getCurrentPositionAsync({});
      const userLat = location.coords.latitude;
      const userLon = location.coords.longitude;

      // Get event location (stored in EventOwner object)
      const eventLat = event.EventOwner?.UserLatitude;
      const eventLon = event.EventOwner?.UserLongitude;

      // If event has no location, stop calculation
      if (eventLat == null || eventLon == null) {
        Alert.alert("Missing location", "This event has no location data.");
        setLoadingDistance(false);
        return;
      }

      // Calculate distance using Haversine formula
      const km = calculateDistance(userLat, userLon, eventLat, eventLon);

      // Store distance (rounded to 2 decimal places)
      setDistance(km.toFixed(2));
    } catch (error) {
      Alert.alert("Error", "Could not calculate event distance.");
    } finally {
      setLoadingDistance(false);
    }
  };

  // ---------------- DISTANCE CALCULATION FUNCTION ----------------
  // This function uses the Haversine formula to calculate the distance
  // between two GPS coordinates (latitude and longitude)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Earth's radius in km

    // Difference between latitudes and longitudes
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    // Haversine formula
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in km
    return R * c;
  };

  // ---------------- UI ----------------
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Logo */}
      <Image
        source={require("../../assets/splash.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.card}>
        <Text style={styles.title}>{event.EventName}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{event.EventDescription}</Text>

        <Text style={styles.label}>Start</Text>
        <Text style={styles.value}>
          {new Date(event.EventStart).toLocaleString()}
        </Text>

        <Text style={styles.label}>Finish</Text>
        <Text style={styles.value}>
          {new Date(event.EventFinish).toLocaleString()}
        </Text>

        <Text style={styles.label}>Distance</Text>
        {loadingDistance ? (
          <ActivityIndicator size="small" />
        ) : distance !== null ? (
          <Text style={styles.value}>{distance} km away</Text>
        ) : (
          <Text style={styles.value}>Distance unavailable</Text>
        )}
      </View>
    </ScrollView>
  );
};

// ---------------- STYLES ----------------

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  logo: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#F2EDC2",
    borderRadius: 18,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#346739",
    marginBottom: 14,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#346739",
    marginTop: 12,
    marginBottom: 4,
  },

  value: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
});

export default EventDetailScreen;

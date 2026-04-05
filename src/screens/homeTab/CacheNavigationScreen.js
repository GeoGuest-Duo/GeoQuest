import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";      // Gets the user's GPS location
import MapView, { Marker } from "react-native-maps";


const calculateDistanceInKm = (startLat, startLong, endLat, endLong) => {
    // GPS coordinates are in degrees - Js math functions need radians
    const toRadians = (value) => (value * Math.PI) / 180;

    // Stores earth's radius in KMs
    const earthRadius = 6371;

    // Calculates difference between to points 
    const diffInLat = toRadians(endLat - startLat);
    const diffInLong = toRadians(endLong - startLong);

    // Using the Haversine formula - Calculates how curved distance works on earth 
    const a =
    Math.sin(diffInLat / 2) * Math.sin(diffInLat / 2) +
    Math.cos(toRadians(startLat)) *
    Math.cos(toRadians(endLat)) *
    Math.sin(diffInLong / 2) *
    Math.sin(diffInLong / 2);
    
    // Converts the value into an angle that represents distance on a sphere
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // earthRadius x calculated angle
    return earthRadius * c;
};

const CacheNavigationScreen = ({navigation, route}) => {
    // Initialisations ---------------------
    const { cache } = route.params;

    // State -------------------------------
    const [location, setLocation] = useState(null);     // Store the user's current location
    const [isLoadingLocations, setIsLoadingLocations] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");   // Store any error message
    const mapRef = useRef(null);    // Creates a reference to the map

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
            setIsLoadingLocations(false);
         };
    
        getLocation();
    }, []);
    

    // To pinpoint both user location and cache location on the map
    useEffect(() => {
        // if location, cache or map is not loaded or ready yet, STOP
        if (!location || !cache || !mapRef.current) return

        // adjust view include all these coordinates
        mapRef.current.fitToCoordinates(
            [
                {
                    latitude: location.latitude,
                    longitude: location.longitude,
                },
                {
                    latitude: cache.CacheLatitude,
                    longitude: cache.CacheLongitude,
                },
            ],
            {
                edgePadding: { top: 100, right: 50, bottom: 100, left: 50 },
                animated: true,     // makes map move smoothly
            }
        );
    }, [location]) 
    
    // Handlers ----------------------------
    // If location exists, calculate the distance 
    const distanceInKm = location
        ? calculateDistanceInKm(
            location.latitude,
            location.longitude,
            cache.CacheLatitude,
            cache.CacheLongitude,
        )
        : 0;
    
    // Loading / error states --------------
    if (errorMessage) {
        return (
        <View style={styles.centerContainer}>
            <Text>{errorMessage}</Text>
            </View>
        );
    }
      
    if (!location || isLoadingLocations) {
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
            <MapView
                ref={mapRef}
                style={styles.map}
                showsUserLocation={true}
            >
                <Marker
                    coordinate={{
                        latitude: Number(cache.CacheLatitude),
                        longitude: Number(cache.CacheLongitude),
                    }}
                    title={cache.CacheName}
                    description={cache.CacheDescription}
                />
            </MapView>
            <View style={styles.distanceTile}>
                <Text style={styles.distanceText}>Distance: {distanceInKm.toFixed(2)} KM</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    map: {
        flex: 1,
    },
    loadingText: {
        marginTop: 10,
    },
    distanceTile: {
        position: "absolute",
        top: 20,
        alignSelf: "center",
        backgroundColor: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 10,
        shadowColor: "#0000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    distanceText: {
        fontSize: 16,
        fontWeight: "600",
    }
});

export default CacheNavigationScreen;

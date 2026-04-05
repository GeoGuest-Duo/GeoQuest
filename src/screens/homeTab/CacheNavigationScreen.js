import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";      // Gets the user's GPS location
import MapView, { Marker } from "react-native-maps";


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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    }
});

export default CacheNavigationScreen;

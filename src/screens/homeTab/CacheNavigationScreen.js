import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef } from "react";
import { useLocation } from '../../context/LocationContext';
import { calculateDistanceInKm } from '../../utils/CalculateDistanceInKm';
import MapView, { Marker, Polyline } from "react-native-maps";
import { Button } from '../../UI/Button';
import { Linking } from 'react-native';

const CacheNavigationScreen = ({navigation, route}) => {
    // Initialisations ---------------------
    const { cache } = route.params;

    // State -------------------------------
    const { location, isLoadingLocation, errorMessage } = useLocation();    
    const mapRef = useRef(null);    // Creates a reference to the map

    // Effect ------------------------------
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
    
    
    // To open an external navigation, e.g, Google Maps
    const openExternalNavigation = () => {
        const lat = Number(cache.CacheLatitude);
        const long = Number(cache.CacheLongitude);

        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`;
        Linking.openURL(url);
    }
    
    // Loading / error states --------------
    if (errorMessage) {
        return (
        <View style={styles.centerContainer}>
            <Text>{errorMessage}</Text>
            </View>
        );
    }
      
    if (!location || isLoadingLocation) {
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
                showsUserLocation={true} // shows user location in blue
            >
                {/* Marks the cache location */}
                <Marker
                    coordinate={{
                        latitude: Number(cache.CacheLatitude),
                        longitude: Number(cache.CacheLongitude),
                    }}
                    title={cache.CacheName}
                    description={cache.CacheDescription}
                />

                {/* To connect the two points with a line*/}
                <Polyline
                    coordinates={[
                        {
                            latitude: location.latitude,
                            longitude: location.longitude,
                        },
                        {
                            latitude: Number(cache.CacheLatitude),
                            longitude: Number(cache.CacheLongitude),
                        },
                    ]}
                    strokeWidth={4}
                    strokeColor='blue'
                />
            </MapView>
            <View style={styles.cacheTile}>
                <Text style={styles.cacheTitle}>{cache.CacheName}</Text>
                <Text style={styles.detailsText}>Distance: {distanceInKm.toFixed(2)} KM</Text>
                <Text style={styles.detailsText}>Clue: {cache.CacheClue}</Text>
                
                <View style={styles.buttonContainer}>
                    <Button
                        label="Open in Maps"
                        onClick={openExternalNavigation}
                        style={styles.button}
                    />
                </View>
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
    cacheTile: {
        position: "absolute",
        bottom: 10,
        left: 15,
        right: 15,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 14,
        shadowColor: "#0000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    cacheTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom:5,
    },
    detailsText: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
    },
    buttonContainer: {
        marginTop: 5,
        alignItems: "center",
    },
});

export default CacheNavigationScreen;

import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ButtonTray } from '../../UI/Button';
import { useLocation } from '../../context/LocationContext';
import { calculateDistanceInKm } from '../../utils/CalculateDistanceInKm';

const LogCacheScreen = ({navigation, route}) => {
    // Initialisations ---------------------
    const { cache } = route.params; 

    // State -------------------------------
    const [logType, setLogType] = useState(null);
    const [proximityMessage, setProximityMessage] = useState("");
    const { location, isLoadingLocation, errorMessage } = useLocation();
    

    // Handlers ----------------------------
    const handleFound = () => {
        const distanceInKm = calculateDistanceInKm(
            location.latitude,
            location.longitude,
            Number(cache.CacheLatitude),
            Number(cache.CacheLongitude),
        );
        if (distanceInKm <= 0.1) {
            setLogType("Found");
            setProximityMessage("You are close enough to log this cache.")
        } else {
            setLogType(null);
            setProximityMessage("You are too far away from this cache to log it.")
        }
    };

    const handleNotFound = () => {
        setLogType("Can't find it");
        setProximityMessage("");
    };

    // Error handling 
    if (errorMessage) {
        return (
            <View style={styles.container}>
                <Text>{errorMessage}</Text>
            </View>
        );
    }

    if (!location || isLoadingLocation) {
        return (
            <View style={styles.container}>
                <Text>Loading location...</Text>
            </View>
        );
    }

    // View --------------------------------
    return (
        <View style={styles.container}>
            <Text style={styles.cacheTitle}>{cache.CacheName}</Text>
            <ButtonTray>
                <Button
                    label={"Found it"}
                    onClick={handleFound}
                />
                <Button
                    label={"Can't find it"}
                    onClick={handleNotFound}
                /> 
            </ButtonTray>

            {proximityMessage ? (
                <Text>{proximityMessage}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    cacheTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
    }
});

export default LogCacheScreen;

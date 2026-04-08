import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { Button, ButtonTray } from '../../UI/Button';
import { useLocation } from '../../context/LocationContext';
import { calculateDistanceInKm } from '../../utils/CalculateDistanceInKm';
import * as ImagePicker from 'expo-image-picker';

const DEV_MODE = true;

const LogCacheScreen = ({navigation, route}) => {
    // Initialisations ---------------------
    const { cache } = route.params; 

    // State -------------------------------
    const { location, isLoadingLocation, errorMessage } = useLocation();

    // Photo
    const [photoURI, setPhotoURI] = useState(null);

    // Handlers ----------------------------
    const handleFound = () => {
        const distanceInKm = calculateDistanceInKm(
            location.latitude,
            location.longitude,
            Number(cache.CacheLatitude),
            Number(cache.CacheLongitude),
        );

        // Too far
        if (!DEV_MODE && distanceInKm > 0.1) {
            Alert.alert(
                "Too far away",
                "Almost there! Step a bit closer (within 100 metres) to log your find."
            );
            return;
        }

        // No photo
        if (!photoURI) {
            Alert.alert(
                "Photo required",
                "Found it? Snap a quick photo to log your discovery!"
            );
            return;
        }

        // Success
        navigation.navigate("LogSuccessScreen", {
            cache,
            photoURI,
        });
    };

    const handleNotFound = () => {
        Alert.alert (
            "Keep exploring!",
            "No worries! Sometimes caches are tricky. Try again or check hints."
        );
    };

    const takePhoto = async () => {
        // Asks the user for permission to use the phone camera
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();  

        // if not permission granted is true, run this if block
        if (!cameraPermission.granted) {
            alert("Camera permission is required");
            return;
        }

        // Opens the phone's camera and saves the output in result
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,    // says only images are allowed
            allowsEditing: false,   // user will not get an editing screen after taking the photo
            quality: 1,
        });

        // Checks whether user actually took a photo
        // if results.cancelled is false = photo taken
        if (!result.canceled) {
            // an array of returned photos, saves the uri of the first photo in photoURI
            setPhotoURI(result.assets[0].uri);
        }
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
            <View style={styles.topSection}>
                <Text style={styles.cacheTitle}>{cache.CacheName}</Text>
                <Text style={styles.descriptionText}>{cache.CacheDescription}</Text>
                <Text style={styles.pointsText}> Points to earn: { cache.CachePoints}</Text>
                <Text style={styles.mainInstruction}>Found it? Snap a quick photo to log your discovery!</Text>

                <Button
                    label="Take photo"
                    onClick={takePhoto}
                />
                
                {/*Display photo taken*/}
                {photoURI && (
                    <Image
                        source={{ uri: photoURI }}
                        style={styles.photo}
                    />
                )}
            </View>
            
            <View style={styles.bottomSection}>
                <Text style={styles.warningText}>Move within 100 metres to claim the cache.</Text>

                {/*Found/NotFound Buttons*/}
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
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    cacheTitle: {
        fontSize: 35,
        color: "#5D4037",
        fontWeight: "bold",
        textAlign: "center",
        padding: 10
    },  
    photo: {
        width: 330,
        height: 230,
        marginTop: 20,
        borderRadius: 10,
    },
    descriptionText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "black",
        marginBottom: 6,
    },
    pointsText: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        color: "#000000", // green
        marginBottom: 12,
    },
    mainInstruction: {
        fontSize: 18,
        textAlign: "center",
        color: "black",
        marginBottom: 20,
    },
    topSection: {
        alignItems: "center",
        marginTop: 20,
    },
    bottomSection: {
        marginTop: "auto",
        marginBottom: 10,
    },
    warningText: {
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        color: "#D32F2F",
        marginBottom: 20,
    },
});

export default LogCacheScreen;

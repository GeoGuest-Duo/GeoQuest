import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';

const LogSuccessScreen = ({navigation, route}) => {
    // Initialisations ---------------------
    const { cache, photoURI } = route.params;
    const { user, isUserLoading } = useAuth();

    // To store the details of the find, who found, cache found, time and photo user captures
    // If user and cache exits return soemthing else return null
    const find = user && cache ? {
        findID: Date.now().toString(), 
        userID: user.UserID,
        cacheID: cache.CacheID,
        cacheName: cache.CacheName,
        cachePoints: cache.CachePoints,
        findDateTime: new Date().toString(),
        photoURI: photoURI,
    }
        : null;

    // State -------------------------------
    const [userFindCount, setUserFindCount] = useState(0);
    // Handlers ----------------------------
    useEffect(() => {
        const logFind = async () => {
            try {

                // Get any previously logged finds
                const pastLogs = await AsyncStorage.getItem("finds");

                // Convert pastLogs into a string array or return an empty array if nothing logged yet 
                const finds = pastLogs ? JSON.parse(pastLogs) : [];

                // Add the new find to the existing finds array 
                const updatedFinds = [...finds, find];

                // To save the updatedFinds to AsyncStorage
                await AsyncStorage.setItem("finds", JSON.stringify(updatedFinds));

                // to find the number of finds for the current user
                const userFinds = updatedFinds.filter(
                    // goes through every find in the storage and checks if it belongs to the current userID
                    f => f.userID === user.UserID
                );

                setUserFindCount(userFinds.length);

                console.log("Find logged successfully:", find);
                console.log("Updated finds:", updatedFinds);
            } catch (error) {
                console.log("Error logging find:", error);
            }
        };

        if (find) {
            logFind();
        }
    }, []);

    if (isUserLoading) {
        return (
            <View>
                <Text>Loading user...</Text>
            </View>
        );
    };

    // Checks to see if any details to log a find is missing
    if (!user || !cache || !photoURI) {
        return (
            <View style={styles.container}>
                <Text>Missing details to log this cache.</Text>
            </View>
        );
    };

    // View --------------------------------
    return (
        <View style={styles.container}>
            <View>
                <Image 
                    source={require("../../../assets/WellDone.png")} 
                    style={styles.image}
                />
            </View>
            <View>
                <Text style={styles.mainText}>You have found {find?.cacheName}</Text>
                <Text style={styles.pointsText}>Points earned: {find?.cachePoints}</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>Total finds: {userFindCount}</Text>
                    <Text style={styles.detailsText}>Photo saved: {find?.photoURI ? "Yes" : "No"}</Text>
                    <Text style={styles.detailsText}>Found on {find?.findDateTime}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    image: {
        width: 400,
        height: 300,
        resizeMode: "contain",
        alignSelf: "center",
    },
    mainText: {
        fontSize: 25,
        fontWeight: "700",
        color: "#346739", 
        textAlign: "center",
        marginBottom: 10,
    },
    pointsText: {
        fontSize: 23,          
        fontWeight: "600",
        color: "#5A2D0C",      
        textAlign: "center",
        marginBottom: 20,
    },
    detailsContainer: {
        marginTop: 0,
        width: "100%",
        padding: 16,
        backgroundColor: "#9FCB98",
        borderColor: "#79AE6F",
        borderRadius: 8,
        borderWidth: 1,
    },
    detailsText: {
        fontSize: 18,          
        color: "#00050f", 
        marginBottom: 4,
    },
});

export default LogSuccessScreen;

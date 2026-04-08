import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
            <Text>Well done!!!!!!!</Text>
            <Text>User: {find?.userID}</Text>
            <Text>Find ID: {find?.findID}</Text>
            <Text>Cache: {find?.cacheID}</Text>
            <Text>Found on {find?.findDateTime }</Text>
            <Text>Photo saved: {find?.photoURI ? "Yes" : "No"}</Text>
            <Text>Total finds: {userFindCount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    }
});

export default LogSuccessScreen;

import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, ButtonTray } from '../../UI/Button';
import * as Location from "expo-location";  

const LogCacheScreen = ({navigation, route}) => {
    // Initialisations ---------------------
    const { cache } = route.params; 

    // State -------------------------------
    const [logType, setLogType] = useState(null);
    const [location, setLocation] = useState(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    // Handlers ----------------------------
    const handleFound = () => {
        setLogType("Found");
    };

    const handleNotFound = () => {
        setLogType("Can't find it")
    };

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

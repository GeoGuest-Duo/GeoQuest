import { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";

// Initialisations ---------------------
const LocationContext = createContext();

const LocationProvider = ({ children }) => {
    // State -------------------------------
    const [location, setLocation] = useState(null);     // Store the user's current location
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");   // Store any error message

    // Effect ----------------------------
    // Request location permission and get current GPS location
    useEffect(() => {
        const getLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
        
            if (status !== "granted") {
                setErrorMessage("Location permission denied.");
                setIsLoadingLocation(false);
                return;
            };
        
            const loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords);
            setIsLoadingLocation(false);
        };
        
        getLocation();
    }, []);

    return (
        <LocationContext.Provider value={{location, isLoadingLocation, errorMessage}}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);

export default LocationProvider;
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialisations ---------------------
// Creates shared global context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    // State -------------------------------
    // useState stroes values
    const [user, setUser] = useState(null);
    const [isUsersLoading, setIsUserLoading] = useState(null);

    // Handlers ----------------------------
    // Load user from storage on app start
    const loadUser = async () => {
        const loggedinUser = await AsyncStorage.getItem("loggedinUser");
        if (loggedinUser) {
            setUser(JSON.parse(loggedinUser));
        }
        setIsUserLoading(false);
    };

    // useEffect runs code when app starts 
    useEffect(() => {
        loadUser();
    }, []);

    // Hanldes login, saves the loggedinUser to asyncStorage
    const login = async (matchedUser) => {
        await AsyncStorage.setItem("loggedinUser", JSON.stringify(matchedUser));
        setUser(matchedUser);
    };

    // Handles logout, clears stored loggedinUser data 
    const logout = async () => {
        await AsyncStorage.removeItem("loggedinUser");
        setUser(null);
    }

    // View --------------------------------
    return (
        <AuthContext.Provider value={{ user, isUsersLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// useContext lets screens use the shared context
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
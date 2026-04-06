import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialisations ---------------------
// Creates shared global context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State -------------------------------
  // useState stores values
  const [user, setUser] = useState(null);
  const [isUsersLoading, setIsUserLoading] = useState(true);

  // Handlers ----------------------------
  // Load user from storage on app start
  const loadUser = async () => {
    try {
      const loggedinUser = await AsyncStorage.getItem("loggedinUser");

      if (loggedinUser) {
        setUser(JSON.parse(loggedinUser));
      }
    } catch (error) {
      console.log("Error loading user:", error);
    } finally {
      setIsUserLoading(false);
    }
  };

  // useEffect runs code when app starts
  useEffect(() => {
    loadUser();
  }, []);

  // Handles login, saves the logged in user to AsyncStorage
  const login = async (matchedUser) => {
    try {
      await AsyncStorage.setItem("loggedinUser", JSON.stringify(matchedUser));
      setUser(matchedUser);
    } catch (error) {
      console.log("Error saving logged in user:", error);
    }
  };

  // Handles updating user details
  const updateUser = async (updatedUser) => {
    try {
      await AsyncStorage.setItem("loggedinUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  // Handles logout, clears stored logged in user data
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("loggedinUser");
      setUser(null);
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  // View --------------------------------
  return (
    <AuthContext.Provider
      value={{ user, isUsersLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// useContext lets screens use the shared context
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

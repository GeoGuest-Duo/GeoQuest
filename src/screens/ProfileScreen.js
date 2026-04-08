import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../UI/Button";
import { useAuth } from "../context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  // Initialisations ---------------------
  const { user, logout } = useAuth();
  const cachesEndpoint = "https://mark0s.com/geoquest/v1/api/caches?key=16gv8f";

  // State -------------------------------
  const [findCount, setFindCount] = useState(0);    // To display the number of finds by the user
  const [points, setPoints] = useState(0);          // To display the number of points earned


  // Handlers ----------------------------
  useFocusEffect(
    useCallback(() => {
      //
      const loadUserStats = async () => {
        try {
          // Gets all saved finds from AsyncStorage 
          const storedFinds = await AsyncStorage.getItem("finds");

          // To convert stored string to arrays 
          const finds = storedFinds ? JSON.parse(storedFinds) : [];

          // Filter out finds for the current loggedinUser
          const userFinds = finds.filter(
            (find) => find.userID === user?.UserID
          );

          // save number of finds into state
          setFindCount(userFinds.length);

          // Fetch all caches from the API
          const response = await fetch(cachesEndpoint);
          const caches = await response.json();

          // Calculate total points for the current loggedinUse
          // .reduce takes an array and turn it into a single value
          // sum = running total; find = current item
          const totalPoints = userFinds.reduce((sum, find) => {
            const matchedCache = caches.find(
              (cache) => Number(cache.CacheID) === Number(find.cacheID)
            );

            // If cache exits, use its points else use 0
            return sum + (matchedCache ? Number(matchedCache.CachePoints) : 0);
          }, 0);

          // To save totalPoints
          setPoints(totalPoints);

          console.log("Current user finds:", userFinds);
          console.log("Total points: ", totalPoints);
        } catch (error) {
          console.log("Error loading find count", error);
        }
      };
      
      if (user) {
        loadUserStats();
      }
      
      return () => { };

    }, [user])
  );

  // View --------------------------------
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>My Profile</Text>

        <View style={styles.card}>
          {user?.UserImageURL ? (
            <Image source={{ uri: user.UserImageURL }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarPlaceholderText}>
                {user?.UserFirstname?.[0]}
                {user?.UserLastname?.[0]}
              </Text>
            </View>
          )}

          <Text style={styles.name}>
            {user?.UserFirstname} {user?.UserLastname}
          </Text>

          <Text style={styles.username}>@{user?.UserUsername}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{points}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{findCount}</Text>
            <Text style={styles.statLabel}>Finds</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <View style={styles.actionButton}>
            <Button
              label="View Events"
              onClick={() => navigation.navigate("EventTab")}
            />
          </View>

          <View style={styles.actionButton}>
            <Button
              label="Change Username"
              onClick={() =>
                navigation.navigate("EditProfileScreen", { mode: "username" })
              }
            />
          </View>

          <View style={styles.actionButton}>
            <Button
              label="Change Password"
              onClick={() =>
                navigation.navigate("EditProfileScreen", { mode: "password" })
              }
            />
          </View>

          <View style={styles.actionButton}>
            <Button label="Logout" onClick={logout} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// Styling the page
const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingTop: 24,
    paddingBottom: 40,
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#41136cff",
  },

  card: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#41136cff",
    borderRadius: 16,
    marginBottom: 18,
    backgroundColor: "#F2EDC2", // the Avatar
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },

  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#0b055eff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  avatarPlaceholderText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ffffff",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
    textAlign: "center",
  },

  username: {
    fontSize: 15,
    color: "#41136cff",
    textAlign: "center",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#41136cff",
    borderRadius: 12,
    backgroundColor: "#F2EDC2",
    marginHorizontal: 4,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#41136cff",
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 14,
    color: "#41136cff",
  },

  actions: {
    width: "100%",
    marginTop: 6,
    gap: 12,
  },

  actionButton: {
    width: "100%",
  },

  logoutWrapper: {
    width: "100%",
    marginTop: 10,
  },
});
export default ProfileScreen;

import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Button } from "../UI/Button";
import { useAuth } from "../context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

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
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
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
    backgroundColor: "#fff",
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
    color: "#30055f92", // purple
  },

  card: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 16,
    marginBottom: 18,
    backgroundColor: "#FAFAFA",
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
    backgroundColor: "#A29BFE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  avatarPlaceholderText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#555",
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
    color: "#777",
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
    borderColor: "#E3E3E3",
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
    marginHorizontal: 4,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 14,
    color: "#666",
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

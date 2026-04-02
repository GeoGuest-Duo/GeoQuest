import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "../UI/Button";

const HomeScreen = ({ route, navigation }) => {
  //Extract the logged-in user passed from LoginScreen
  const user = route.params?.user;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to GeoQuest</Text>
      <Text style={styles.subtitle}>
        Hi {user?.UserFirstname}, ready to hunt?
      </Text>
      {/* Display user profile image only if available */}
      <View style={styles.card}>
        {user?.UserImageURL ? (
          <Image source={{ uri: user.UserImageURL }} style={styles.avatar} />
        ) : null}

        <Text style={styles.name}>
          {user?.UserFirstname} {user?.UserLastname}
        </Text>
        <Text style={styles.username}></Text>
      </View>
      {/* Displays user statistics such as total points, number of finds, and joined events*/}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text>Points</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text>Finds</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text>Events</Text>
        </View>
      </View>
      {/*Navigation buttons allowing the user to access core app features such as events, map, progress, and logout */}
      <View style={styles.buttons}>
        <Button
          label="View Events"
          onClick={() => navigation.navigate("EventScreen")}
        />
        <Button
          label="Open Map"
          onClick={() => navigation.navigate("MapScreen")}
        />
        <Button
          label="My Progress"
          onClick={() => navigation.navigate("ProgressScreen")}
        />
        <Button
          label="Logout"
          onClick={() => navigation.replace("LoginScreen")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  username: {
    color: "gray",
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  statBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    minWidth: 90,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttons: {
    width: "100%",
    gap: 10,
  },
});

export default HomeScreen;

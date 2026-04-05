import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { useAuth } from "../context/AuthContext";

const LeaderboardScreen = ({ navigation }) => {
  // State -------------------------------
  // Stores processed leaderboard data
  const [leaderboard, setLeaderboard] = useState([]);

  // Tracks loading state while fetching data
  const [isLoading, setIsLoading] = useState(true);

  // Get current logged-in user
  const { user } = useAuth();

  // API endpoints -----------------------
  const playersEndpoint =
    "https://mark0s.com/geoquest/v1/api/players?key=16gv8f";
  const findsEndpoint = "https://mark0s.com/geoquest/v1/api/finds?key=16gv8f";

  // Effects -----------------------------
  // Load leaderboard data when screen mounts
  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        // Fetch all players
        const playersResponse = await fetch(playersEndpoint);
        const playersData = await playersResponse.json();

        // Fetch all finds
        const findsResponse = await fetch(findsEndpoint);
        const findsData = await findsResponse.json();

        // Ensure safe arrays
        const safePlayers = Array.isArray(playersData) ? playersData : [];
        const safeFinds = Array.isArray(findsData) ? findsData : [];

        // Build leaderboard data
        const leaderboardData = safePlayers.map((player) => {
          // Get all finds belonging to this player
          const playerFinds = safeFinds.filter(
            (find) => find.FindPlayerID === player.PlayerID,
          );

          // Calculate total points
          const totalPoints = playerFinds.reduce((sum, find) => {
            return sum + (find.FindCache?.CachePoints || 0);
          }, 0);

          return {
            playerId: player.PlayerID,
            userId: player.PlayerUser?.UserID || null,
            name: player.PlayerUser
              ? `${player.PlayerUser.UserFirstname} ${player.PlayerUser.UserLastname}`
              : `Player ${player.PlayerID}`,
            username: player.PlayerUser?.UserUsername || "",
            finds: playerFinds.length,
            points: totalPoints,
          };
        });

        // Sort by highest points first
        leaderboardData.sort((a, b) => b.points - a.points);

        setLeaderboard(leaderboardData);
      } catch (error) {
        console.log("Error loading leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  // Handlers ----------------------------
  // Handle clicking a leaderboard row
  const handlePlayerPress = (item) => {
    // If you have a User/Profile detail screen, navigate there
    // Example:
    // navigation.navigate("UserDetailScreen", { selectedUserId: item.userId });

    // Temporary behaviour:
    Alert.alert(
      "Player Selected",
      `${item.name}\n@${item.username}\n${item.points} points`,
    );
  };

  // Render each leaderboard row ----------
  const renderItem = ({ item, index }) => {
    // Check whether this row belongs to the logged-in user
    const isCurrentUser = item.userId === user?.UserID;

    return (
      <Pressable
        onPress={() => handlePlayerPress(item)}
        style={({ pressed }) => [
          styles.card,
          isCurrentUser && styles.currentUserCard,
          pressed && styles.pressedCard,
        ]}>
        {/* Player rank */}
        <Text style={[styles.rank, isCurrentUser && styles.currentUserText]}>
          #{index + 1}
        </Text>

        {/* Player info */}
        <View style={styles.info}>
          <Text style={[styles.name, isCurrentUser && styles.currentUserText]}>
            {item.name}
          </Text>
          <Text style={styles.subtext}>
            @{item.username} • {item.finds} finds
          </Text>
        </View>

        {/* Total points */}
        <Text style={[styles.points, isCurrentUser && styles.currentUserText]}>
          {item.points} pts
        </Text>
      </Pressable>
    );
  };

  // View --------------------------------
  return (
    <View style={styles.container}>
      {/* Screen title */}
      <Text style={styles.title}>Leaderboard</Text>

      {/* Show loading spinner while fetching data */}
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={leaderboard}
          keyExtractor={(item) => item.playerId.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

// Styles -------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  currentUserCard: {
    borderColor: "#007AFF",
    backgroundColor: "#EAF3FF",
  },
  pressedCard: {
    opacity: 0.8,
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    width: 45,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtext: {
    color: "gray",
    marginTop: 2,
  },
  points: {
    fontSize: 16,
    fontWeight: "bold",
  },
  currentUserText: {
    color: "#005BBB",
  },
});

export default LeaderboardScreen;

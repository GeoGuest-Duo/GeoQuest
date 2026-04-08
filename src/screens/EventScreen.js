import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "../UI/Button";
import useLoad from "../API/useLoad";

const EventScreen = ({ navigation }) => {
  // Initialisations ---------------------
  const eventsEndpoint = "https://mark0s.com/geoquest/v1/api/events?key=16gv8f";

  // State -------------------------------
  const [events, setEvents, isEventsLoading, loadEvents] =
    useLoad(eventsEndpoint);

  // Keep only public events
  const publicEvents = events.filter((event) => event.EventIspublic === true);

  // Handlers ----------------------------
  // here is showing the  Function to render each event card,
  // showing event details (name, description, dates)
  // and allowing user interaction
  const renderEvent = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.eventName}>{item.EventName}</Text>
        <Text style={styles.eventDescription}>{item.EventDescription}</Text>
        <Text style={styles.eventText}>
          Start: {new Date(item.EventStart).toLocaleString()}
        </Text>
        <Text style={styles.eventText}>
          Finish: {new Date(item.EventFinish).toLocaleString()}
        </Text>

        <Button
          label="Open Event"
          onClick={() => navigation.navigate("EventDetails", { event: item })}
        />
      </View>
    );
  };
  {
    /* Main UI for the Events screen, 
    conditionally rendering loading state,
     empty state, or a list of events */
  }
  // View --------------------------------
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Public Events</Text>

      {isEventsLoading ? (
        <ActivityIndicator size="large" />
      ) : publicEvents.length === 0 ? (
        <Text>No public events found.</Text>
      ) : (
        <FlatList
          data={publicEvents}
          keyExtractor={(item) => item.EventID.toString()}
          renderItem={renderEvent}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 18,
    color: "#346739",
  },

  list: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: "#F2EDC2",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  eventName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#346739",
  },

  eventDescription: {
    fontSize: 15,
    marginBottom: 10,
    color: "#333",
    lineHeight: 22,
  },

  eventText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },

  buttonContainer: {
    marginTop: 12,
  },

  emptyText: {
    fontSize: 16,
    color: "#346739",
    marginTop: 20,
  },
});

export default EventScreen;

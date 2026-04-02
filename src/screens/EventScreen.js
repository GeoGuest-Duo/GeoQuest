import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "../UI/Button";
import API from "../API/API";
// Event Endpoint
const EventsScreen = ({ navigation }) => {
  const eventsEndpoint = "https://mark0s.com/geoquest/v1/api/events?key=16gv8f";

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    setIsLoading(true);

    const response = await API.get(eventsEndpoint);

    if (!response.isSuccess) {
      Alert.alert("Error", response.message || "Could not load events");
      setIsLoading(false);
      return;
    }

    // Keep only public events
    const publicEvents = response.result.filter(
      (event) => event.EventIspublic === true,
    );

    setEvents(publicEvents);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);
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
          onClick={() => console.log("Selected event:", item.EventID)}
        />
      </View>
    );
  };
  {
    /* Main UI for the Events screen, 
    conditionally rendering loading state,
     empty state, or a list of events */
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Public Events</Text>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : events.length === 0 ? (
        <Text>No public events found.</Text>
      ) : (
        <FlatList
          data={events}
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  eventDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  eventText: {
    fontSize: 13,
    color: "#555",
    marginBottom: 4,
  },
});

export default EventsScreen;

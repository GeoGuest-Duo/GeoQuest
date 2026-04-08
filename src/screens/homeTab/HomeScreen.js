import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useStore from "../../store/useStore";
import MapView, { Marker } from "react-native-maps";
import Icons from "../../UI/Icons";
import { useLocation } from "../../context/LocationContext";

const HomeScreen = ({ navigation }) => {
  // Initialisations ---------------------
  const cachesEndpoint = "https://mark0s.com/geoquest/v1/api/caches?key=16gv8f";  // GeoQuest API endpoint for caches
  
  // State -------------------------------
  // Get the logged-in user from storage
  const [user] = useStore("loggedinUser", null); 

  // Caches states 
  const [caches, setCaches] = useState([]);   // Store all caches loaded from the GeoQuest API
  const [selectedCache, setSelectedCache] = useState(null);   // To store the selectedCach details 
  const [isLoadingCaches, setIsLoadingCaches] = useState(true);  // Store cache loading state
  const [cacheErrorMessage, setCacheErrorMessage] = useState(""); 

  // Location
  const { location, isLoadingLocation, errorMessage } = useLocation()

  // Effect ------------------------------
  // Load caches from the GeoQuest API
  useEffect(() => {
    const loadCaches = async () => {
      try {
        const response = await fetch(cachesEndpoint);
        const data = await response.json();
        setCaches(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Error loading caches:", error);
        setCacheErrorMessage("Unable to load caches.");
      } finally {
        setIsLoadingCaches(false);
      }
    };

    loadCaches();
  }, []);

  // Handlers ----------------------------
  // if user taps on the selectedCache marker again, it navigates them to ViewCacheScreen
  // else the details on the selectedCache is shown on a tile
  const handleSelectCache = (cache) => {
    if (selectedCache && selectedCache?.CacheID === cache.CacheID) {
      navigation.navigate("ViewCacheScreen", { cache: selectedCache });
      return;
    }
    setSelectedCache(cache);
  };

  // Loading / error states --------------
    if (errorMessage || cacheErrorMessage) {
      return (
        <View style={styles.centerContainer}>
          <Text>{errorMessage || cacheErrorMessage}</Text>
        </View>
      );
    }
  
    if (!location || isLoadingLocation || isLoadingCaches) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      );
    }
  
  // View --------------------------------
  return (
    <SafeAreaView style={styles.container}>
      {/* Welcome title */}
      <View>
        <Text style={styles.header}> Hi {user?.UserFirstname}, ready for an adventure?</Text>
      </View>

      {/* Full interactive map centered on the user's current location */}
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation={true}>
        
        {/* Marker showing the user's current location */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You are here"
          description="Your current GPS position"
        />

        {/* Markers for all caches loaded from the API */}
        {caches.map((cache) => (
          <Marker
            key={cache.CacheID}
            coordinate={{
              latitude: Number(cache.CacheLatitude),
              longitude: Number(cache.CacheLongitude),
            }}
            onPress={() => handleSelectCache(cache)}
          />
        ))}
      </MapView>

      {
        selectedCache && (
          <Pressable
            style={styles.cacheTile}
            onPress={() => navigation.navigate("ViewCacheScreen", { cache: selectedCache })}
          >
            <View style={styles.tileContent}>
              <View style={{flex: 1}}>
                <Text style={styles.cacheTitle}>{selectedCache.CacheName}</Text>
                <Text style={styles.cacheDescription} numberOfLines={2}> {selectedCache.CacheDescription}</Text>
              </View>

              <Icons.ChevronRight/>
            </View>
          </Pressable>
        )
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5A2D0C",
    textAlign: "center",  
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 18,
  },
  map: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
  },
  cacheTile: {
    position: "absolute",
    bottom: 25,
    left: 15,
    right: 15,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  cacheTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cacheDescription: {
    fontSize: 14,
    color: "black",
  },
  tileContent: {
    flexDirection: "row",
    alignItems: "center",
  }
});

export default HomeScreen;

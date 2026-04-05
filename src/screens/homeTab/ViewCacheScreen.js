import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, ButtonTray } from '../../UI/Button';
import Icons from '../../UI/Icons';

const ViewCacheScreen = ({navigation, route}) => {
    // Initialisations ---------------------
    const { cache } = route.params;
    const defaultCacheImage = 'https://media.istockphoto.com/id/2215235871/vector/closed-treasure-chest.jpg?s=1024x1024&w=is&k=20&c=-u9riDDu05crei8ivCdWtu5u2XBtW7lZvXe7jHht_sI=';
    // State -------------------------------
    // Handlers ----------------------------
    const goToNavigateScreen = () => {
        navigation.navigate("CacheNavigationScreen", { cache });
    };

    const goToLogCacheScreen = () => {
        navigation.navigate("LogCacheScreen", { cache });
    };


    // View --------------------------------
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: cache?.CacheImageURL || defaultCacheImage }}
                style={styles.image}
            />
            
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{cache.CacheName}</Text>

                <ButtonTray style={styles.buttonTray}>
                    <Button
                        label="Navigate"
                        icon={<Icons.Navigation />}
                        onClick={goToNavigateScreen}
                    />

                    <Button
                        label="Log Cache"
                        icon={<Icons.Complete />}
                        onClick={goToLogCacheScreen}
                    />
                </ButtonTray>

                <Text style={styles.label}>Description</Text>
                <Text style={styles.text}>{cache.CacheDescription}</Text>

                <Text style={styles.label}>Clue</Text>
                <Text style={styles.text}>{cache.CacheClue}</Text>

                <Text style={styles.label}>Points</Text>
                <Text style={styles.points}>{cache.CachePoints}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
    },
    image: {
        width: "100%",
        height: 250,
    },
    detailsContainer: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 4,
    },
    text: {
        fontSize: 16,
        color: "#444",
        lineHeight: 22,
    },
    points: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 2,
    },
});

export default ViewCacheScreen;

import { StyleSheet, Text, View } from "react-native";

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Create an account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignupScreen;
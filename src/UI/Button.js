import { StyleSheet, Text, View } from "react-native";
import Selector from "./Selector";

export const Button = ({ label, icon, onClick, styleButton, styleLabel }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <Selector
      onPress={onClick}
      style={[styles.button, styleButton]}
      pressedStyle={styles.pressedButton}>
      <Text style={[styles.label, styleLabel]}>{label}</Text>
      {icon ? icon : null}
    </Selector>
  );
};

export const ButtonTray = ({ children }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return <View style={styles.buttonTray}>{children}</View>;
};

const styles = StyleSheet.create({
  buttonTray: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginVertical: 5,
    width: "100%",
  },
  button: {
    minHeight: 55,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 8,
  },
  label: {
    fontSize: 16,
  },
  pressedButton: {
    backgroundColor: "azure",
    elevation: 5,
  },
});

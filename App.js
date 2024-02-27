import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Scanner from "./src/Screens/Home/Scanner";
import { TamaguiProvider, createTamagui } from "tamagui";
import { config } from "@tamagui/config/v3";
import WelcomeScreen from "./src/Screens/Login/WelcomeScreen";
import Navigation from "./src/navigation/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import Schedule from "./src/Screens/Schedule/Schedule";

const tamaguiConfig = createTamagui(config);

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

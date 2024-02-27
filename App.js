import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Scanner from "./src/Screens/Home/Scanner";
import WelcomeScreen from "./src/Screens/Login/WelcomeScreen";
import Navigation from "./src/navigation/Navigation";
import Schedule from "./src/Screens/Schedule/Schedule";
import { UserProvider } from "./src/constants/context";

export default function App() {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
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

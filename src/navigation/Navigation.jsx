import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../Screens/Login/WelcomeScreen";
import Login from "../Screens/Login/Login";
import SignUp from "../Screens/Login/SignUp";
import Scanner from "../Screens/Home/Scanner";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Scanner" component={Scanner} />
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});

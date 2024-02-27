import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../Screens/Login/WelcomeScreen";
import Login from "../Screens/Login/Login";
import SignUp from "../Screens/Login/SignUp";
import Scanner from "../Screens/Home/Scanner";
import BottomTabs from "./BottomTabs";
import { useUser } from "../constants/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditProfile from "../Screens/Profile/EditProfile";

const AuthenticatedStack = createNativeStackNavigator();
const NonAuthenticatedStack = createNativeStackNavigator();

const AuthenticatedNavigator = () => (
  <AuthenticatedStack.Navigator
    initialRouteName="Tabs"
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: "horizontal",
    }}
  >
    <AuthenticatedStack.Screen name="Tabs" component={BottomTabs} />
    <AuthenticatedStack.Screen name="EditProfile" component={EditProfile} />
  </AuthenticatedStack.Navigator>
);

const NonAuthenticatedNavigator = () => (
  <NonAuthenticatedStack.Navigator
    initialRouteName="WelcomeScreen"
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: "horizontal",
    }}
  >
    <NonAuthenticatedStack.Screen
      name="WelcomeScreen"
      component={WelcomeScreen}
    />
    <NonAuthenticatedStack.Screen name="Login" component={Login} />
    <NonAuthenticatedStack.Screen name="SignUp" component={SignUp} />
  </NonAuthenticatedStack.Navigator>
);

const Navigation = () => {
  const { isAuthenticated, setisAuthenticated } = useUser();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const userId = await AsyncStorage.getItem("userId");
  //     if (userId) {
  //       setisAuthenticated(true);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AuthenticatedNavigator />
      ) : (
        <NonAuthenticatedNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/theme";
import Schedule from "../Screens/Schedule/Schedule";
import Scanner from "../Screens/Home/Scanner";
import Profile from "../Screens/Profile/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: "10%",
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
          backgroundColor: "#fff",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Schedule}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-home" size={24} color={colors.primary} />
            ) : (
              <Ionicons name="ios-home-outline" size={24} color="#ccc" />
            ),
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="scan" size={24} color={colors.primary} />
            ) : (
              <Ionicons name="scan" size={24} color="#ccc" />
            ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={22} color={colors.primary} />
            ) : (
              <Ionicons name="md-person-outline" size={22} color="#ccc" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});

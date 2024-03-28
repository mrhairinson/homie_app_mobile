import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import COLOR from "../constants/color";
import Search from "../screens/Search";
import Map from "../screens/Map";
import Message from "../screens/Message";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLOR.PRIMARY,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { display: getTabbarVisibility(route) },
      })}
    >
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-o" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabbarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Search";
  if (
    routeName === "Signup" ||
    routeName === "Verification" ||
    routeName === "Signin"
  ) {
    return "none";
  }
  return "visible";
};

export default BottomTabNavigator;

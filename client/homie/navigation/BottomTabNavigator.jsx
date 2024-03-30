import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import React from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
        unmountOnBlur={true}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        unmountOnBlur={true}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        unmountOnBlur={true}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        unmountOnBlur={true}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
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

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import React from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import COLOR from "../constants/color";
import Search from "../screens/Search";
import Map from "../screens/Map";
// import Chat from "../screens/Chat";
import Profile from "../screens/Profile";
import ChatNavigator from "./ChatNavigator";
import AuthNavigator from "./AuthNavigator";
import { useAuth } from "../contexts/AuthProvider";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { isLoggedIn, socket } = useAuth();
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLOR.PRIMARY,
        tabBarShowLabel: false,
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
          headerShown: false,
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
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Chats"
        component={isLoggedIn ? ChatNavigator : AuthNavigator}
        unmountOnBlur={true}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-sharp" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={isLoggedIn ? Profile : AuthNavigator}
        unmountOnBlur={true}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const getTabbarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Search";
  // console.log(routeName);
  if (
    routeName === "Signup" ||
    routeName === "Verification" ||
    routeName === "Signin" ||
    routeName === "Message"
  ) {
    return "none";
  }
  return "visible";
};

export default BottomTabNavigator;

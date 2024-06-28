import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { AuthProvider } from "./contexts/AuthProvider";
import React from "react";
import { LocationProvider } from "./contexts/UserLocationProvider";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#4169e1" />
      <AuthProvider>
        <LocationProvider>
          <NavigationContainer>
            <BottomTabNavigator />
          </NavigationContainer>
        </LocationProvider>
      </AuthProvider>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

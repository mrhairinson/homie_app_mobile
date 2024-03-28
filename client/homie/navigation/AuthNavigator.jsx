import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import NotLogin from "../screens/NotLogin";
import Signin from "../screens/Signin";
import Signup from "../screens/Signup";
import Verification from "../screens/Verification";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="NotLogin">
      <Stack.Screen name="NotLogin" component={NotLogin} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

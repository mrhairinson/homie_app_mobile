import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import NotLogin from "../screens/NotLogin";
import Signin from "../screens/Signin";
import Signup from "../screens/Signup";
import Verification from "../screens/Verification";
import Search from "../screens/Search";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="NotLogin">
      <Stack.Screen
        name="NotLogin"
        component={NotLogin}
        options={{ title: "Bạn chưa đăng nhập" }}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ title: "Đăng nhập" }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Đăng kí" }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{ title: "Xác thực OTP" }}
      />
      <Stack.Screen
        name="Search"
        options={{ headerShown: false }}
        component={Search}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

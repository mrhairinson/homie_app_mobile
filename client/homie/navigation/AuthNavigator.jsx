import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import NotLogin from "../screens/auth/NotLogin";
import Signin from "../screens/auth/Signin";
import Signup from "../screens/auth/Signup";
import Verification from "../screens/auth/Verification";
// import Search from "../screens/Search";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="NotLogin">
      <Stack.Screen
        name="NotLogin"
        component={NotLogin}
        options={{ title: "Bạn cần đăng nhập để sử dụng!" }}
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
    </Stack.Navigator>
  );
};

export default AuthNavigator;

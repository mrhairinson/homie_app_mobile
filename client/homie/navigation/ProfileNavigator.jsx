import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Profile from "../screens/profile/Profile";
import PasswordChange from "../screens/profile/PasswordChange";

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordChange"
        component={PasswordChange}
        options={{ title: "Đổi mật khẩu" }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

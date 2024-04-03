import { View, Text, Button } from "react-native";
import React from "react";

const NotLogin = ({ navigation }) => {
  return (
    <View>
      <Text>Đã có tài khoản</Text>
      <Button title="Đăng nhập" onPress={() => navigation.navigate("Signin")} />
      <Text>Chưa có tài khoản</Text>
      <Button title="Đăng kí" onPress={() => navigation.navigate("Signup")} />
    </View>
  );
};

export default NotLogin;

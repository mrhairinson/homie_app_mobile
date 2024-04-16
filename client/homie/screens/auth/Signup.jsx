import {
  View,
  TextInput,
  Button,
  Pressable,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useState } from "react";
import React from "react";
import { signup } from "../../apis";
import { ERROR_MESSAGE, SUCCESS_CODE } from "../../constants/error";

const Signup = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    // Xử lý logic đăng ký ở đây, chẳng hạn như gửi mã xác nhận
    const { errorCode } = await signup(phoneNumber, password);
    console.log(errorCode);
    errorCode === SUCCESS_CODE
      ? navigation.navigate("Verification", {
          phoneNumber: phoneNumber,
        })
      : Alert.alert("Thông báo", ERROR_MESSAGE[errorCode]);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại của bạn"
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.password}
        placeholder="Nhập mật khẩu"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button
        title="Đăng ký"
        onPress={handleSignUp}
        disabled={!phoneNumber || !password} // Tắt nút nếu số điện thoại trống
      />
      <View style={styles.changeSignIn}>
        <Text>Đã có tài khoản?</Text>
        <Pressable onPress={() => navigation.navigate("Signin")}>
          <Text style={styles.highlight}>Đăng nhập</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  password: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  changeSignIn: {
    flexDirection: "row",
    marginTop: 20,
    gap: 5,
  },
  highlight: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default Signup;

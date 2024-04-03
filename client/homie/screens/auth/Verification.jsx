import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { verify } from "../../apis";
import { ERROR_MESSAGE, SUCCESS_CODE } from "../../constants/error";

const Verification = ({ route, navigation }) => {
  const { phoneNumber } = route.params;

  const [otp, setOTP] = useState("");

  const handleVerifyOTP = async () => {
    // Xử lý logic xác thực OTP ở đây
    const { errorCode } = await verify(phoneNumber, otp);
    console.log(errorCode);
    if (errorCode === SUCCESS_CODE) {
      Alert.alert("Thông báo", "Xác thực thành công.");
      navigation.navigate("Signin");
    } else {
      Alert.alert("Thông báo", ERROR_MESSAGE[errorCode]);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập mã OTP 6 số"
        onChangeText={(text) => setOTP(text)}
        value={otp}
        keyboardType="numeric"
        maxLength={6}
      />
      <Button
        title="Xác thực OTP"
        onPress={handleVerifyOTP}
        disabled={otp.length !== 6} // Tắt nút nếu độ dài mã OTP không đủ 6 ký tự
      />
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
  },
});

export default Verification;

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { changePassword } from "../../apis";
import LoadingOverlay from "../../components/LoadingOverlay";
import { ERROR_MESSAGE, SUCCESS_CODE } from "../../constants/error";
import { Feather } from "@expo/vector-icons";

const PasswordChange = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = async () => {
    setLoading(true);
    const response = await changePassword(password);
    setLoading(false);
    if (response.errorCode === SUCCESS_CODE) {
      Alert.alert(
        "Đổi MK thành công",
        `Mật khẩu mới của bạn là ${response.data.newPassword}`
      );
      setPassword(""); // Clear the input field
      navigation.goBack();
    } else {
      Alert.alert("Thông báo", ERROR_MESSAGE[response.errorCode]);
    }
  };
  return (
    <View style={styles.container}>
      <LoadingOverlay visible={loading} />
      <Text style={styles.title}>Đổi mật khẩu</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu mới"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <Button
        title="Xác nhận"
        onPress={handleChangePassword}
        disabled={!password}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    height: 40,
  },
});
export default PasswordChange;

import {
  View,
  TextInput,
  Button,
  Pressable,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import React from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { signin, forgotPassword } from "../../apis";
import { ERROR_MESSAGE, SUCCESS_CODE } from "../../constants/error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import { SERVER_URL } from "../../constants/resources";
import LoadingOverlay from "../../components/LoadingOverlay";
import { Feather } from "@expo/vector-icons";

const Signin = ({ navigation }) => {
  const { setIsLoggedIn, setProfile, setSocket, setChats } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleGetBackPassword = async () => {
    setLoading(true);
    let response = await forgotPassword(phoneNumber);
    setLoading(false);
    if (response.errorCode === SUCCESS_CODE) {
      Alert.alert(
        "Lấy mk mới thành công",
        `Mật khẩu mới của bạn là ${response.data.newPassword}`
      );
    } else {
      Alert.alert("Thông báo", ERROR_MESSAGE[response.errorCode]);
    }
  };
  const handleLogin = async () => {
    setLoading(true);
    let response = await signin(phoneNumber, password);
    setLoading(false);
    if (response.errorCode === SUCCESS_CODE) {
      //Lưu data vào Async Storage
      try {
        await AsyncStorage.setItem(
          "jwtToken",
          JSON.stringify(response.jwtToken)
        );
      } catch (error) {
        console.error("Error saving data:", error);
      }
      //Lấy userId
      let userId = response?.user?._id;
      //Set context True cho Authentication
      setIsLoggedIn(true);
      //Set profile trong context
      setProfile(response.user);
      //Tao socket connection
      const newSocket = io(SERVER_URL);
      setSocket(newSocket);
      newSocket.on("connect", () => {
        // Tham gia server chat
        newSocket.emit("join", userId); // Replace 'USER_ID_HERE' with the actual user ID
      });
    } else {
      Alert.alert("Thông báo", ERROR_MESSAGE[response.errorCode]);
    }
  };

  return (
    <View>
      <LoadingOverlay visible={loading} />
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại đã đăng kí"
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
        keyboardType="phone-pad"
      />
      <View style={styles.passwordContainer}>
        {/* <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu mới"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        /> */}
        <TextInput
          style={styles.password}
          placeholder="Nhập mật khẩu"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
          value={password}
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
        title="Đăng nhập"
        onPress={handleLogin}
        disabled={!phoneNumber || !password} // Disable button if phone number is empty
      />
      <View style={styles.changeSignUp}>
        <Text>Bạn chưa có tài khoản?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.highlight}>Đăng kí</Text>
        </Pressable>
      </View>
      {phoneNumber && (
        <Pressable onPress={handleGetBackPassword}>
          <Text style={styles.highlight}>Quên mật khẩu</Text>
        </Pressable>
      )}
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
    flex: 1,
    height: 40,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  changeSignUp: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    gap: 5,
  },
  highlight: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default Signin;

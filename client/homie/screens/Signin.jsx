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
import { useAuth } from "../contexts/AuthProvider";
import { signin } from "../apis";
import { ERROR_MESSAGE, SUCCESS_CODE } from "../constants/error";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signin = ({ navigation }) => {
  const { setIsLoggedIn, setProfile } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = async () => {
    let response = await signin(phoneNumber);
    if (response.errorCode === SUCCESS_CODE) {
      //Lưu data vào Async Storage
      try {
        //Set profile trong context
        setProfile(response.user);
        await AsyncStorage.setItem(
          "jwtToken",
          JSON.stringify(response.jwtToken)
        );
      } catch (error) {
        console.error("Error saving data:", error);
      }
      //Set context True cho Authentication
      setIsLoggedIn(true);
    } else {
      Alert.alert("Thông báo", ERROR_MESSAGE[response.errorCode]);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại đã đăng kí"
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
        keyboardType="phone-pad"
      />
      <Button
        title="Đăng nhập"
        onPress={handleLogin}
        disabled={!phoneNumber} // Disable button if phone number is empty
      />
      <View style={styles.changeSignUp}>
        <Text>Bạn chưa có tài khoản?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.highlight}>Đăng kí</Text>
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
  changeSignUp: {
    flexDirection: "row",
    marginTop: 20,
    gap: 5,
  },
  highlight: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default Signin;

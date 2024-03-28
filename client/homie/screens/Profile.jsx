import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthProvider";
import AuthNavigator from "../navigation/AuthNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const { isLoggedIn, setIsLoggedIn, profile } = useAuth();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Clear AsyncStorage successfully");
    } catch (error) {
      console.error("Error removing data:", error);
    }
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <View style={styles.userInfo}>
        <Text>Tên: {profile.name}</Text>
        <Text>Số điện thoại: {profile.phoneNumber}</Text>
        <Text>Ngày sinh: {profile.dob}</Text>
      </View>
      <Button title="Đăng xuất" onPress={handleLogout} />
    </View>
  ) : (
    <AuthNavigator />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 20,
  },
});

export default Profile;

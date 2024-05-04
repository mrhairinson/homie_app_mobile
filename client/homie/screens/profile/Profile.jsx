import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useAuth } from "../../contexts/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLOR from "../../constants/color";
import {
  FontAwesome5,
  MaterialIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { updateUser } from "../../apis";
import { SUCCESS_CODE, ERROR_MESSAGE } from "../../constants/error";

const Profile = () => {
  const { setIsLoggedIn, profile, setProfile, socket } = useAuth();
  const [isUpdate, setIsUpdate] = useState(false);
  const [name, setName] = useState(null);
  const [dob, setDob] = useState(null);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setName(profile.name);
    setDob(profile.dob);
    setImage(profile.image ?? null);
  }, [profile]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error removing data:", error);
    }
    socket.disconnect();
    setIsLoggedIn(false);
  };

  const handleUpdateBtn = () => {
    setIsUpdate(!isUpdate);
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("image", {
      name: file.fileName,
      uri: file.uri,
      type: file.mimeType,
    });
    let res = await updateUser(formData, profile._id);
    if (res.errorCode === SUCCESS_CODE) {
      setProfile(res.data);
      Alert.alert("Thông báo", "Cập nhật thông tin thành công");
      setIsUpdate(!isUpdate);
    } else {
      Alert.alert("Lỗi", ERROR_MESSAGE[res.errorCode]);
    }
  };

  const handleTakeImageByCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        aspect: [1, 1],
        // base64: true,
      });
      if (!result.canceled) {
        changeImage(result.assets[0]);
      }
    } catch (error) {
      console.log("Camera error:", error);
    }
  };

  const handleTakeImageByGallery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      // base64: true,
    });
    // console.log(result.assets[0]);
    if (!result.canceled) {
      changeImage(result.assets[0]);
    }
  };

  const returnDefaultImage = () => {
    changeImage(null);
  };

  const changeImage = (file) => {
    setImage(file.uri);
    setFile(file);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleUpdateBtn}>
          <Text style={styles.updateProfileButton}>
            <FontAwesome5
              name="user-edit"
              size={24}
              color={isUpdate ? COLOR.PRIMARY : COLOR.BLACK}
            />
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin cá nhân</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>
            <MaterialIcons name="logout" size={24} color={COLOR.ERROR} />
          </Text>
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Image
          style={styles.avatar}
          source={
            image
              ? { uri: image }
              : require("../../assets/images/avartar-default.jpg")
          }
        />
        {/* Image replace button */}
        {isUpdate && (
          <View>
            <View style={styles.updateImage}>
              <TouchableOpacity onPress={handleTakeImageByCamera}>
                <FontAwesome5
                  style={styles.updateImageBtn}
                  name="camera"
                  size={24}
                  color={COLOR.PRIMARY}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleTakeImageByGallery}>
                <FontAwesome
                  style={styles.updateImageBtn}
                  name="image"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={returnDefaultImage}>
                <AntDesign
                  style={styles.updateImageBtn}
                  name="delete"
                  size={24}
                  color={COLOR.ERROR}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.updateInfo}>
              <TextInput
                style={styles.input}
                placeholder="Tên"
                onChangeText={(text) => setName(text)}
                value={name}
              />
              <TextInput
                style={styles.input}
                placeholder="Ngày tháng năm sinh"
                onChangeText={(text) => setDob(text)}
                value={dob}
              />
              <TouchableOpacity onPress={handleUpdateProfile}>
                <Text style={styles.updateButton}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {!isUpdate && (
          <View>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.phoneNumber}>{profile.phoneNumber}</Text>
            <Text style={styles.dateOfBirth}>{profile.dob}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  updateProfileButton: {
    fontSize: 16,
    color: "blue",
  },
  body: {
    flex: 1,
    width: "100%",
    justifyContent: "top",
    alignItems: "center",
    paddingTop: 40,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: "gray",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  phoneNumber: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  dateOfBirth: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  updateImage: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "45%",
  },
  updateImageBtn: {
    borderRadius: 50,
    padding: 7,
    backgroundColor: COLOR.LIGHT_GRAY,
  },
  input: {
    height: 30,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    paddingHorizontal: 5,
  },
  updateButton: {
    height: 40,
    fontSize: 16,
    color: "white",
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 5,
    paddingVertical: 8,
    textAlign: "center",
    marginTop: 15,
  },
});

export default Profile;

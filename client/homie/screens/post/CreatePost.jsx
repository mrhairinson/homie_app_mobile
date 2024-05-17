import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  ScrollView,
  Image,
} from "react-native";
import CheckBox from "../../components/CheckBox";
import COLOR from "../../constants/color";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5, FontAwesome, AntDesign } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthProvider";
import { createPost, getAllPost, getDistricts } from "../../apis";
import { SUCCESS_CODE, ERROR_MESSAGE } from "../../constants/error";
import DropDown from "../../components/DropDown";
import LoadingOverlay from "../../components/LoadingOverlay";

const CreatePost = ({ navigation }) => {
  const { profile, setPosts, cities } = useAuth();
  const [postName, setPostName] = useState("");
  const [city, setCity] = useState({});
  const [district, setDistrict] = useState({});
  const [location, setLocation] = useState("");
  const [roomArea, setRoomArea] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [roomPriceElectricity, setRoomPriceElectricity] = useState("");
  const [roomPriceWater, setRoomPriceWater] = useState("");
  const [roomPriceInternet, setRoomPriceInternet] = useState("");
  const [roomPriceCleaning, setRoomPriceCleaning] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [hasAirConditional, setHasAirConditional] = useState(false);
  const [hasHeater, setHasHeater] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    setLoading(true);
    // Perform actions to post the data, e.g., send to server
    const formData = new FormData();
    formData.append("postName", postName);
    formData.append("city", city.name);
    formData.append("district", district.name);
    formData.append("location", location);
    formData.append("roomArea", roomArea);
    formData.append("roomPrice", roomPrice);
    formData.append("roomPriceElectricity", roomPriceElectricity);
    formData.append("roomPriceWater", roomPriceWater);
    formData.append("roomPriceInternet", roomPriceInternet);
    formData.append("roomPriceCleaning", roomPriceCleaning);
    formData.append("roomDescription", roomDescription);
    formData.append("hasAirConditional", hasAirConditional);
    formData.append("hasHeater", hasHeater);
    formData.append("isClosed", isClosed);
    formData.append("ownerId", profile._id);
    formData.append("ownerName", profile.name);

    imageList.map((image) => {
      formData.append("image", {
        name: image.fileName,
        uri: image.uri,
        type: image.mimeType,
      });
    });
    const res = await createPost(formData);
    setLoading(false);
    if (res.errorCode === SUCCESS_CODE) {
      // setProfile(res.data);
      Alert.alert("Thông báo", "Thêm bài đăng thành công!");
      //Update post
      let result = await getAllPost();
      setPosts(result);
      navigation.navigate("SearchScreen");
    } else {
      console.log(res);
      Alert.alert("Lỗi", ERROR_MESSAGE[res.errorCode]);
    }
  };

  const handleTakeImageByGallery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      // base64: true,
    });
    // console.log(result.assets[0]);
    if (!result.canceled) {
      setImageList([...imageList, result.assets[0]]);
    }
  };

  const handleTakeImageByCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        aspect: [4, 3],
        // base64: true,
      });
      if (!result.canceled) {
        setImageList([...imageList, result.assets[0]]);
      }
    } catch (error) {
      console.log("Camera error:", error);
    }
  };

  const deleteAllImage = () => {
    setImageList([]);
  };

  const handleChangeCities = async (cityItem) => {
    setCity(cityItem);
    setDistrict(new Object());
    setLocation("");
    //get district by city._id
    let responses = await getDistricts(cityItem._id);
    if (responses.errorCode === SUCCESS_CODE) {
      setDistrictList(responses.data);
    } else {
      Alert.alert("Thông báo", ERROR_MESSAGE[responses.errorCode]);
    }
  };

  const handleChangeDistrict = (districtItem) => {
    setDistrict(districtItem);
    setLocation("");
  };

  const handleFocusLocation = () => {
    if (location !== "") {
      //Khi chọn vào ô địa chỉ chi tiết, sẽ tạm bỏ đi quận và thành phố
      let locationDetail = location.split(",").slice(0, -2).join(",");
      setLocation(locationDetail);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <LoadingOverlay visible={loading} />
      <TextInput
        style={styles.input}
        placeholder="Tên bài đăng"
        value={postName}
        onChangeText={(text) => setPostName(text)}
      />
      <DropDown
        inputLabel="Thành phố"
        materialCommunityIcons="city-variant-outline"
        data={cities}
        mapLabel="name"
        mapValue="_id"
        onValueChange={handleChangeCities}
        isDisabled={false}
        initVal={city.name}
      />
      <DropDown
        inputLabel="Quận/Huyện"
        materialCommunityIcons="home-city-outline"
        data={districtList}
        mapLabel="name"
        mapValue="_id"
        onValueChange={handleChangeDistrict}
        isDisabled={Object.keys(city).length === 0}
        initVal={district.name}
      />
      <TextInput
        style={styles.input}
        placeholder="Vị trí cụ thể"
        value={location}
        onChangeText={(text) => setLocation(text)}
        onFocus={handleFocusLocation}
        onEndEditing={() => {
          if (location) {
            const locationDetail = `${location}, ${district.name}, ${city.name}`;
            setLocation(locationDetail);
          }
        }}
        editable={Object.keys(district).length !== 0}
      />
      <View style={styles.priceAreaContainer}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Diện tích phòng"
          value={roomArea}
          keyboardType="numeric"
          onChangeText={(text) => setRoomArea(text)}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Giá phòng"
          value={roomPrice}
          keyboardType="numeric"
          onChangeText={(text) => setRoomPrice(text)}
        />
      </View>
      <View style={styles.priceAreaContainer}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Giá điện"
          value={roomPriceElectricity}
          keyboardType="numeric"
          onChangeText={(text) => setRoomPriceElectricity(text)}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Giá nước"
          value={roomPriceWater}
          keyboardType="numeric"
          onChangeText={(text) => setRoomPriceWater(text)}
        />
      </View>
      <View style={styles.priceAreaContainer}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Giá mạng Internet"
          value={roomPriceInternet}
          keyboardType="numeric"
          onChangeText={(text) => setRoomPriceInternet(text)}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Giá vệ sinh"
          value={roomPriceCleaning}
          keyboardType="numeric"
          onChangeText={(text) => setRoomPriceCleaning(text)}
        />
      </View>
      <TextInput
        style={[styles.input]}
        placeholder="Mô tả chi tiết"
        value={roomDescription}
        onChangeText={(text) => setRoomDescription(text)}
      />
      <View style={styles.priceAreaContainer}>
        <View style={[styles.checkBoxContainer, styles.halfInput]}>
          <Text style={styles.checkBoxLabel}>Điều hòa:</Text>
          <CheckBox
            onChange={() => setHasAirConditional(!hasAirConditional)}
            checked={hasAirConditional}
          />
        </View>
        <View style={[styles.checkBoxContainer, styles.halfInput]}>
          <Text style={styles.checkBoxLabel}>Nóng lạnh:</Text>
          <CheckBox
            onChange={() => setHasHeater(!hasHeater)}
            checked={hasHeater}
          />
        </View>
      </View>
      <View style={styles.priceAreaContainer}>
        <View style={[styles.checkBoxContainer, styles.halfInput]}>
          <Text style={styles.checkBoxLabel}>Khép kín:</Text>
          <CheckBox
            onChange={() => setIsClosed(!isClosed)}
            checked={isClosed}
          />
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.imageDisplayContainer}>
        <Text style={styles.updateImageText}>Tải ảnh lên</Text>
        <View style={styles.updateImage}>
          <TouchableOpacity onPress={handleTakeImageByCamera}>
            <FontAwesome5
              style={styles.updateImageBtn}
              name="camera"
              size={28}
              color="gray"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTakeImageByGallery}>
            <FontAwesome
              style={styles.updateImageBtn}
              name="image"
              size={28}
              color="gray"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteAllImage}>
            <AntDesign
              style={styles.updateImageBtn}
              name="delete"
              size={28}
              color={COLOR.ERROR}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.images}>
          {imageList.map((image, index) => (
            <Image
              key={index}
              style={styles.imageRoom}
              source={{ uri: image.uri }}
            />
          ))}
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <TouchableOpacity style={styles.buttonAdd} onPress={handlePost}>
        <Text style={styles.buttonAddText}>Đăng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  buttonAdd: {
    backgroundColor: COLOR.PRIMARY,
    padding: 10,
    marginBottom: 50,
    marginTop: 10,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonAddText: {
    color: COLOR.WHITE,
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  priceAreaContainer: {
    flexDirection: "row",
    gap: 10,
  },
  halfInput: {
    flex: 1,
    // marginRight: 10,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkBoxLabel: {
    marginRight: 10,
  },
  horizontalLine: {
    width: "80%", // Chiều rộng của đường thẳng ngang
    height: 1, // Chiều cao của đường thẳng ngang
    backgroundColor: "gray", // Màu của đường thẳng
    alignSelf: "center",
  },
  updateImage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    marginTop: 5,
    // width: "45%",
  },
  updateImageText: {
    color: COLOR.BLACK,
    fontWeight: "bold",
    fontSize: 18,
  },
  updateImageBtn: {
    borderRadius: 5,
    padding: 5,
    backgroundColor: COLOR.LIGHT_GRAY,
    borderColor: COLOR.BLACK,
    borderWidth: 1,
  },
  images: {
    flexDirection: "column",
    justifyContent: "center",
  },
  imageRoom: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default CreatePost;

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import CheckBox from "../components/CheckBox";
import { useAuth } from "../contexts/AuthProvider";
import { getFilterPosts, getDistricts, getPostsOfUser } from "../apis";
import { SUCCESS_CODE, ERROR_MESSAGE } from "../constants/error";
import DropDown from "../components/DropDown";

const Filter = ({ navigation }) => {
  const { isLoggedIn, setPosts, cities, profile } = useAuth();
  const [city, setCity] = useState({});
  const [district, setDistrict] = useState({});
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [airConditioner, setAirConditioner] = useState(false);
  const [heater, setHeater] = useState(false);
  const [closed, setClosed] = useState(false);
  const [onlyUserPost, setOnlyUserPost] = useState(false);
  const [districtList, setDistrictList] = useState([]);

  const handleChangeCities = async (cityItem) => {
    setCity(cityItem);
    setDistrict({});
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
  };

  const handleSearch = async () => {
    //Tạo query Object
    if (onlyUserPost) {
      //Gọi API
      let responses = await getPostsOfUser(profile["_id"]);
      if (responses.errorCode === SUCCESS_CODE) {
        setPosts(responses.data.reverse());
        navigation.navigate("SearchScreen");
      } else {
        Alert.alert("Thông báo", ERROR_MESSAGE[responses.errorCode]);
      }
    } else {
      let query = {};
      if (Object.keys(city).length !== 0) query.city = city.name;
      if (Object.keys(district).length !== 0) query.district = district.name;
      if (minPrice !== "" && maxPrice !== "")
        query.roomPrice = `${minPrice}+${maxPrice}`;
      if (minArea !== "" && maxArea !== "")
        query.roomPrice = `${minPrice}+${maxPrice}`;
      if (airConditioner) query.hasAirConditional = true;
      if (heater) query.hasHeater = true;
      if (closed) query.isClosed = true;
      //Gọi API
      let responses = await getFilterPosts(query);
      if (responses.errorCode === SUCCESS_CODE) {
        setPosts(responses.data.reverse());
        navigation.navigate("SearchScreen");
      } else {
        Alert.alert("Thông báo", ERROR_MESSAGE[responses.errorCode]);
      }
    }
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.priceAreaContainer}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Min giá phòng"
          keyboardType="numeric"
          value={minPrice}
          onChangeText={(text) => setMinPrice(text)}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Max giá phòng"
          keyboardType="numeric"
          value={maxPrice}
          onChangeText={(text) => setMaxPrice(text)}
        />
      </View>
      <View style={styles.priceAreaContainer}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Min diện tích"
          keyboardType="numeric"
          value={minArea}
          onChangeText={(text) => setMinArea(text)}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Max diện tích"
          keyboardType="numeric"
          value={maxArea}
          onChangeText={(text) => setMaxArea(text)}
        />
      </View>
      <View style={styles.priceAreaContainer}>
        <View style={[styles.checkBoxContainer, styles.halfInput]}>
          <Text style={styles.checkBoxLabel}>Điều hòa:</Text>
          <CheckBox
            onChange={() => setAirConditioner(!airConditioner)}
            checked={airConditioner}
          />
        </View>
        <View style={[styles.checkBoxContainer, styles.halfInput]}>
          <Text style={styles.checkBoxLabel}>Nóng lạnh:</Text>
          <CheckBox onChange={() => setHeater(!heater)} checked={heater} />
        </View>
      </View>
      <View style={styles.priceAreaContainer}>
        <View style={[styles.checkBoxContainer, styles.halfInput]}>
          <Text style={styles.checkBoxLabel}>Khép kín:</Text>
          <CheckBox onChange={() => setClosed(!closed)} checked={closed} />
        </View>
      </View>
      {isLoggedIn && (
        <View style={[styles.checkBoxContainer]}>
          <CheckBox
            onChange={() => setOnlyUserPost(!onlyUserPost)}
            checked={onlyUserPost}
          />
          <Text style={styles.checkBoxRightLabel}>
            Chỉ hiện bài đăng cá nhân
          </Text>
        </View>
      )}
      <Button title="Tìm kiếm" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  halfInput: {
    flex: 1,
    // marginRight: 10,
  },
  priceAreaContainer: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 10,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkBoxLabel: {
    marginRight: 10,
  },
  checkBoxRightLabel: {
    marginLeft: 10,
  },
});

export default Filter;

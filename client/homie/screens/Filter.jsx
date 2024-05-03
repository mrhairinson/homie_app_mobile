import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import CheckBox from "../components/CheckBox";
import { useAuth } from "../contexts/AuthProvider";
import { getFilterPosts } from "../apis";
import { SUCCESS_CODE, ERROR_MESSAGE } from "../constants/error";

const Filter = () => {
  const { isLoggedIn, setPosts, posts } = useAuth();
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [airConditioner, setAirConditioner] = useState(false);
  const [heater, setHeater] = useState(false);
  const [closed, setClosed] = useState(false);
  const [onlyUserPost, setOnlyUserPost] = useState(false);

  const handleSearch = async () => {
    //Tạo query Object
    let query = {};
    if (city !== "") query.city = city;
    if (district !== "") query.district = district;
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
      setPosts(responses.data);
    } else {
      Alert.alert("Thông báo", ERROR_MESSAGE[responses.errorCode]);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Tìm kiếm phòng trọ</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Tỉnh/Thành phố"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Quận/Huyện"
        value={district}
        onChangeText={(text) => setDistrict(text)}
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
    marginRight: 10,
  },
  priceAreaContainer: {
    flexDirection: "row",
    marginBottom: 10,
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

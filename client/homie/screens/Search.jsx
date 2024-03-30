import { View, StyleSheet, FlatList, Pressable, Text } from "react-native";
import { StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { getAllPost, getUserLocation } from "../apis";
import * as Location from "expo-location";
import { useLocation } from "../contexts/UserLocationProvider";
import { FontAwesome } from "@expo/vector-icons";
import COLOR from "../constants/color";

const Search = ({ navigation }) => {
  const [posts, setPosts] = useState(null);
  const [address, setAddress] = useState(null);
  const { userLocation, setUserLocation } = useLocation();
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchPost = async () => {
    try {
      const result = await getAllPost();
      setPosts(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPost();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      //Lấy vị trí hiện tại của người dùng
      let curLocation = await Location.getCurrentPositionAsync({});
      let longitude = curLocation.coords.longitude;
      let latitude = curLocation.coords.latitude;
      try {
        const result = await getUserLocation(longitude, latitude);
        setAddress(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
      setUserLocation(curLocation.coords);
    })();
  }, []);

  const navigateToMap = (location) => {
    navigation.navigate("Map", { location });
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (userLocation) {
    text = JSON.stringify(userLocation);
  }
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <View>
          <Text style={styles.address}>
            {address?.district}, {address?.city}
          </Text>
        </View>
        <Pressable style={styles.filter} onPress={() => console.log("filter")}>
          <FontAwesome name="filter" size={24} color={COLOR.PRIMARY} />
        </Pressable>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post post={item} navigateMap={navigateToMap} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  address: {
    fontSize: 21,
    fontWeight: "bold",
  },
});

export default Search;

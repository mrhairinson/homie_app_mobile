import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Text,
  Linking,
} from "react-native";
import { StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { getAllPost, getUserLocation } from "../apis";
import { useLocation } from "../contexts/UserLocationProvider";
import { FontAwesome } from "@expo/vector-icons";
import COLOR from "../constants/color";

const Search = ({ navigation }) => {
  const [posts, setPosts] = useState(null);
  const [address, setAddress] = useState(null);
  const { userLocation, setUserLocation } = useLocation();

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
      let longitude = userLocation?.longitude;
      let latitude = userLocation?.latitude;
      try {
        const result = await getUserLocation(longitude, latitude);
        setAddress(result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [userLocation]);

  const navigateToMap = (location) => {
    // navigation.navigate("Map", { location });
    // Construct the URL with the start and end coordinates
    const url = `https://www.google.com/maps/dir/${userLocation.latitude},${userLocation.longitude}/${location.latitude},${location.longitude}`;
    // Open Google Maps with directions
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
    // setUserLocation({
    //   longitude: Number(location.longitude),
    //   latitude: Number(location.latitude),
    // });
  };

  const navigateToChat = (receiver) => {
    navigation.navigate("Chats", {
      screen: "Message",
      params: receiver,
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <View>
          <Text style={styles.address}>
            {userLocation ? `${address?.district}, ${address?.city}` : ","}
          </Text>
        </View>
        <Pressable style={styles.filter} onPress={() => console.log("filter")}>
          <FontAwesome name="filter" size={24} color={COLOR.PRIMARY} />
        </Pressable>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post
            post={item}
            navigateMap={navigateToMap}
            navigateChat={navigateToChat}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 25,
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

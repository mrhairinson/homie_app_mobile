import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Text,
  Linking,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { getAllPost, getUserLocation } from "../apis";
import { useLocation } from "../contexts/UserLocationProvider";
import { FontAwesome } from "@expo/vector-icons";
import COLOR from "../constants/color";
import { useAuth } from "../contexts/AuthProvider";

const Search = ({ navigation }) => {
  const [address, setAddress] = useState(null);
  const { userLocation, setUserLocation } = useLocation();
  const { isLoggedIn, posts } = useAuth();

  useEffect(() => {
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
    const url = `https://www.google.com/maps/dir/?api=1&origin=${
      userLocation.latitude
    },${userLocation.longitude}&destination=${encodeURIComponent(
      location.location
    )}`;
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

  const filterPost = () => {
    navigation.navigate("FilterScreen");
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
        <Pressable style={styles.filter} onPress={filterPost}>
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
      {isLoggedIn && (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      )}
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
  button: {
    position: "absolute",
    bottom: 50,
    right: 20,
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Search;

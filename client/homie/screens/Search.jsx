import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Text,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { getAllPost, getUserLocation } from "../apis";
import { useLocation } from "../contexts/UserLocationProvider";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import COLOR from "../constants/color";
import { useAuth } from "../contexts/AuthProvider";
import NoData from "../components/NoData";

const Search = ({ navigation }) => {
  const [address, setAddress] = useState(null);
  const { userLocation, setUserLocation } = useLocation();
  const { isLoggedIn, posts, setPosts } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(true);
  const fetchPost = async () => {
    try {
      setIsRefreshing(true);
      const result = await getAllPost();
      setPosts(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    (async () => {
      let longitude = userLocation?.longitude;
      let latitude = userLocation?.latitude;
      try {
        const result = await getUserLocation(longitude, latitude);
        setAddress(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsRefreshing(false);
      }
    })();
  }, [userLocation]);
  useEffect(() => {
    fetchPost();
  }, []);
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

  const refreshList = async () => {
    try {
      setIsRefreshing(true);
      const result = await getAllPost();
      setPosts(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const filterPost = () => {
    navigation.navigate("FilterScreen");
  };

  const createPost = () => {
    navigation.navigate("CreatePost");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.address}>
            {userLocation
              ? `Quận ${address?.district}, ${
                  address?.city === "Hanoi" ? "Hà Nội" : address?.city
                }`
              : ","}
          </Text>
        </View>
        <Pressable style={styles.filter} onPress={filterPost}>
          <FontAwesome name="filter" size={24} color={COLOR.PRIMARY} />
        </Pressable>
      </View>
      {posts?.length <= 0 && !isRefreshing && (
        <NoData message="Không tìm thấy phòng nào, vuốt lên để tải lại!" />
      )}
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post
            post={item}
            navigateMap={navigateToMap}
            navigateChat={navigateToChat}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={refreshList}
      />
      {isLoggedIn && (
        <TouchableOpacity style={styles.button} onPress={createPost}>
          <FontAwesome6 name="add" size={28} color={COLOR.WHITE} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    height: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  address: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLOR.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 80,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Search;

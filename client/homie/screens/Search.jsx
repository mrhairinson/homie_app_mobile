import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import { StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";

// const baseUrl = "http://localhost:8080/api/v1";

const Search = () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.7:8080/api/v1/post/`
        );
        console.log(response.data.data);
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar />
      <FlatList data={posts} renderItem={({ item }) => <Post post={item} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
});

export default Search;

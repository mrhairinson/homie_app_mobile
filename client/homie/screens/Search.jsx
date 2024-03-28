import { View, StyleSheet, FlatList } from "react-native";
import { StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { getAllPost } from "../apis";

const Search = () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await getAllPost();
        setPosts(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPost();
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

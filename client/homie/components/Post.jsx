import { View, Text, StyleSheet, Button, Image, Pressable } from "react-native";
import Carousel from "pinar";
import React, { useState } from "react";
import COLOR from "../constants/color";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthProvider";
import { formatMoneyToVND } from "../utils";

const Post = (props) => {
  const { isLoggedIn } = useAuth();
  const post = props.post;
  const [showDetail, setShowDetail] = useState(false);
  const images = [];
  return (
    <View style={styles.container}>
      {/* Image  */}
      <Carousel height={200} showsControls={false}>
        <Image
          style={styles.image}
          source={require("../assets/images/room-default.jpg")}
        />
        <Image
          style={styles.image}
          source={require("../assets/images/room-default.jpg")}
        />
        <Image
          style={styles.image}
          source={require("../assets/images/room-default.jpg")}
        />
      </Carousel>

      {/* Name  */}
      <Text style={styles.postName}>{post.postName}</Text>

      <Pressable
        style={styles.location}
        onPress={() => console.log("Move to map")}
      >
        <Ionicons name="location" size={18} color="black" />
        <Text style={{ textDecorationLine: "underline" }}>{post.location}</Text>
      </Pressable>
      <View style={styles.horizontal}>
        <MaterialIcons name="attach-money" size={18} color="black" />
        <Text>{formatMoneyToVND(post.roomPrice)} VNĐ</Text>
      </View>

      {/* Contact */}
      <View style={styles.contact}>
        {isLoggedIn ? (
          <Button
            title="Nhắn tin"
            onPress={() => console.log("Go to message")}
          />
        ) : (
          <></>
        )}
        <Button
          title={`Gọi ${[post.phoneNumber]}`}
          onPress={() => console.log("Calling")}
        />
      </View>
      {/* Show the detail Post*/}
      {showDetail && (
        <View>
          <View style={styles.horizontal}>
            <FontAwesome5 name="expand-arrows-alt" size={16} color="black" />
            <Text>{post.roomArea} m2</Text>
          </View>
          <View style={styles.horizontal}>
            <MaterialIcons name="electric-bolt" size={16} color="black" />
            <Text>{formatMoneyToVND(post.roomPriceElectricity)} VNĐ/Kwh</Text>
          </View>
          <View style={styles.horizontal}>
            <Ionicons name="water" size={16} color="black" />
            <Text>{formatMoneyToVND(post.roomPriceWater)} VNĐ/m3</Text>
          </View>
          <View style={styles.horizontal}>
            <MaterialIcons name="network-wifi" size={16} color="black" />
            <Text>{formatMoneyToVND(post.roomPriceInternet)} VNĐ/Tháng</Text>
          </View>
          <View style={styles.horizontal}>
            <MaterialIcons name="cleaning-services" size={16} color="black" />
            <Text>{formatMoneyToVND(post.roomPriceCleaning)} VNĐ/Tháng</Text>
          </View>
          <View style={styles.horizontal}>
            {/* <MaterialIcons name="info" size={16} color="black" /> */}
            <Text style={{ fontWeight: "bold" }}>Mô tả:</Text>
            <Text>{post.roomDescription}</Text>
          </View>
        </View>
      )}
      {/* Show detail */}
      <Pressable onPress={() => setShowDetail(!showDetail)}>
        <Text style={styles.watchDetail}>
          {showDetail ? "Thu gọn" : "Xem thông tin chi tiết"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    gap: 5,
  },
  image: {
    width: "100%",
    aspectRatio: 3.47 / 2,
    resizeMode: "cover",
    borderRadius: 5,
  },
  carousel: {
    width: "100%",
    height: "auto",
  },
  postName: {
    marginVertical: 10,
    color: COLOR.BLACK,
    fontSize: 20,
    fontWeight: "bold",
  },
  contact: {
    flexDirection: "row",
    marginBottom: 5,
    gap: 10,
  },
  horizontal: {
    flexDirection: "row",
    gap: 5,
  },
  location: {
    flexDirection: "row",
    gap: 5,
  },
  watchDetail: {
    color: "#5b5b5b",
    textDecorationLine: "underline",
  },
});

export default Post;

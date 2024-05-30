import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Pressable,
  Alert,
  Platform,
  Linking,
} from "react-native";
import Carousel from "pinar";
import React, { useState } from "react";
import COLOR from "../constants/color";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthProvider";
import { formatDate, formatMoneyToVND } from "../utils";
import { deletePost, getAllPost } from "../apis";

const Post = ({ post, navigateMap, navigateChat }) => {
  const { isLoggedIn, profile, setPosts } = useAuth();
  const [showDetail, setShowDetail] = useState(false);

  const makePhoneCall = () => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${post.phoneNumber}`);
    } else {
      Linking.openURL(`telprompt:${post.phoneNumber}`);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      //Refresh list
      Alert.alert("Thông báo", "Xóa bài thành công!");
      const response = await getAllPost();
      setPosts(response);
    } catch (error) {
      console.log(error);
    }
  };
  const showConfirmAlert = (postId) => {
    Alert.alert(
      "Xác nhận xóa bài",
      "Bạn có chắc muốn xóa bài này không?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => handleDeletePost(postId),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {/* Image  */}
      <Carousel height={200} showsControls={false}>
        {post.image ? (
          post?.image?.map((item) => (
            <Image key={item} style={styles.image} source={{ uri: item }} />
          ))
        ) : (
          <Image
            style={styles.image}
            source={require("../assets/images/room-default.jpg")}
          />
        )}
      </Carousel>

      {/* Name  */}
      <Text style={styles.postName}>{post.postName}</Text>
      <Text style={styles.postDate}>
        Ngày đăng: {formatDate(post.createdAt)}
      </Text>

      <Pressable style={styles.location} onPress={() => navigateMap(post)}>
        <Ionicons name="location" size={18} color="black" />
        <Text style={{ textDecorationLine: "underline" }}>{post.location}</Text>
      </Pressable>
      <View style={styles.horizontal}>
        <MaterialIcons name="attach-money" size={18} color="black" />
        <Text>{formatMoneyToVND(post.roomPrice)} VNĐ</Text>
      </View>

      {/* Contact */}
      <View style={styles.contact}>
        {isLoggedIn &&
          (post.phoneNumber === profile.phoneNumber ? (
            <>
              <Button
                title="Xóa bài đăng"
                onPress={() => showConfirmAlert(post["_id"])}
                color={COLOR.ERROR}
              />
            </>
          ) : (
            <Button
              title="Nhắn tin"
              onPress={() => {
                navigateChat({
                  receiverId: post.ownerId,
                  receiverName: post.ownerName,
                });
              }}
              color={COLOR.PRIMARY}
            />
          ))}
        {(!isLoggedIn || post.phoneNumber !== profile.phoneNumber) && (
          <Button
            title={`Gọi ${[post.phoneNumber]}`}
            onPress={makePhoneCall}
            color={COLOR.PRIMARY}
          />
        )}
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
    color: COLOR.BLACK,
    fontSize: 22,
    fontWeight: "bold",
  },
  postDate: {
    marginBottom: 10,
    color: COLOR.BLACK,
    fontSize: 12,
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

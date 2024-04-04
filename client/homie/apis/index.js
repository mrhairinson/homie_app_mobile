import axios from "axios";

const baseUrl = "http://192.168.1.7:8080/api/v1";
const accessToken =
  "pk.eyJ1IjoiaGFpMTIxMjIwMDEiLCJhIjoiY2x1ZTFyMGZtMTU4dTJqa2kybzc2NzQ4cyJ9.0orgMwvt58BgDPgayn-eFA";

// Lấy danh sách bài đăng
export const getAllPost = async () => {
  try {
    const response = await axios.get(`${baseUrl}/post`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetch data: ", error);
  }
};

//Đăng kí
export const signup = async (phoneNumber) => {
  try {
    const reqBody = {
      phoneNumber: phoneNumber,
    };
    const response = await axios.post(`${baseUrl}/auth/signup`, reqBody);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//Xác minh
export const verify = async (phoneNumber, otp) => {
  try {
    const reqBody = {
      phoneNumber: phoneNumber,
      otpNumber: otp,
    };
    const response = await axios.post(`${baseUrl}/auth/signup/verify`, reqBody);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//Đăng nhập
export const signin = async (phoneNumber) => {
  try {
    const reqBody = {
      phoneNumber: phoneNumber,
    };
    const response = await axios.post(`${baseUrl}/auth/signin`, reqBody);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//Lấy dữ liệu người dùng
export const getUserLocation = async (longitude, latitude) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`
    );
    return {
      district:
        response.data.features[0].context[
          response.data.features[0].context.length - 3
        ].text,
      city: response.data.features[0].context[
        response.data.features[0].context.length - 2
      ].text,
    };
  } catch (error) {
    console.error(error);
  }
};

//Lấy thong tin chatbox của người dùng
export const getChats = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/chat/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetch data: ", error);
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/user/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetch data: ", error);
  }
};

export const getNewestMessage = async (chatId) => {
  try {
    const response = await axios.get(`${baseUrl}/message/newest/${chatId}`);
    return response.data.data[0];
  } catch (error) {
    console.error("Error fetch data: ", error);
  }
};

export const getMessages = async (chatId) => {
  try {
    const response = await axios.get(`${baseUrl}/message/${chatId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetch data: ", error);
  }
};

export const getChat = async (firstId, secondId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/chat/find/${firstId}/${secondId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetch data: ", error);
  }
};

import axios from "axios";

import { BASE_URL, MAP_BOX_PUBLIC_KEY } from "@env";

import { getJwtToken } from "../utils";

const baseUrl = BASE_URL;
const accessToken = MAP_BOX_PUBLIC_KEY;

// Lấy danh sách bài đăng
export const getAllPost = async () => {
  try {
    const response = await axios.get(`${baseUrl}/post`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetch data: ", error);
  }
};

// Lấy danh sách bài đăng has filter
export const getFilterPosts = async (filterObj) => {
  try {
    let response;
    if (Object.keys(filterObj).length !== 0) {
      response = await axios.get(`${baseUrl}/post/filter`, {
        params: filterObj,
      });
    } else {
      response = await axios.get(`${baseUrl}/post/filter`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetch data: ", error);
    return error.response.data;
  }
};

//Đăng kí
export const signup = async (phoneNumber, password) => {
  try {
    const reqBody = {
      phoneNumber: phoneNumber,
      password: password,
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
export const signin = async (phoneNumber, password) => {
  try {
    const reqBody = {
      phoneNumber: phoneNumber,
      password: password,
    };
    const response = await axios.post(`${baseUrl}/auth/signin`, reqBody);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

//Sửa thông tin người dùng
export const updateUser = async (formData, id) => {
  try {
    const jwtToken = await getJwtToken();
    const headers = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${jwtToken}`,
    };
    console.log(formData);
    const response = await axios.post(
      `${baseUrl}/user/update/${id}`,
      formData,
      { headers: headers }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response;
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

export const createMessage = async ({ chatId, senderId, text }) => {
  try {
    reqData = {
      chatId,
      senderId,
      text,
    };
    const response = await axios.post(`${baseUrl}/message`, reqData);
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

export const createChat = async ({ firstId, secondId }) => {
  try {
    reqData = {
      firstId,
      secondId,
    };
    const response = await axios.post(`${baseUrl}/chat`, reqData);
    return response.data.data;
  } catch (error) {
    console.error("Error fetch data: ", error);
  }
};

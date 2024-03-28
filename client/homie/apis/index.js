import axios from "axios";

const baseUrl = "http://192.168.1.7:8080/api/v1";

export const getAllPost = async () => {
    try {
        const response = await axios.get(`${baseUrl}/post`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetch data: ',error);
    }
};

export const signup = async (phoneNumber) => {
    try {
        const reqBody = {
            phoneNumber: phoneNumber
        };
        const response = await axios.post(`${baseUrl}/auth/signup`, reqBody);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const verify = async (phoneNumber, otp) => {
    try {
        const reqBody = {
            phoneNumber: phoneNumber,
            otpNumber: otp
        };
        const response = await axios.post(`${baseUrl}/auth/signup/verify`, reqBody);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const signin = async (phoneNumber) => {
    try {
        const reqBody = {
            phoneNumber: phoneNumber
        };
        const response = await axios.post(`${baseUrl}/auth/signin`, reqBody);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
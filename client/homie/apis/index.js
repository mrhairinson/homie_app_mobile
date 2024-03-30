import axios from "axios";

const baseUrl = "http://192.168.1.7:8080/api/v1";
const accessToken = "pk.eyJ1IjoiaGFpMTIxMjIwMDEiLCJhIjoiY2x1ZTFyMGZtMTU4dTJqa2kybzc2NzQ4cyJ9.0orgMwvt58BgDPgayn-eFA";


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

export const getUserLocation = async (longitude, latitude) => {
    try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`);
        return {
            district: response.data.features[0].context[response.data.features[0].context.length - 3].text,
            city: response.data.features[0].context[response.data.features[0].context.length - 2].text,
        };
    } catch (error) {
        console.error(error);
    }
};
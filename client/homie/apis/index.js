import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1";

export const getAllPost = async () => {
    try {
        const response = await axios.get(`${baseUrl}/post`);
        return response.data;
    } catch (error) {
        console.error('Error fetch data: ',error);
    }
};
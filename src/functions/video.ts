import axios from "axios";
import { API_URL } from "constants/constants";

export const uploadVideo = async (data: unknown) => {
    console.log(data);

    const response = await axios({
        method: "post",
        url: API_URL + "video/upload",
        data: data,
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
    });
    if (response && response.data) return response.data;
}


export const getVideos = async (id: number) => {
    const response = await axios.get(`${API_URL}video/user/${id}`, { withCredentials: true }).catch((err: Error) => {
        console.log("Error: ", err);
    })
    console.log(response);

    if (response && response.data) return response.data;
}

export const getAllVideos = async (search = "", limit: number = 25, offset: number = 0) => {
    const response = await axios.get(`${API_URL}video/?search=${search}&limit=${limit}&offset=${offset}`).catch((err: Error) => {
        console.log("Error: ", err);
    })
    if (response && response.data) return response.data;
}

export const getSingleVideo = async (username: string, title: string) => {
    const response = await axios.get(`${API_URL}video/${username}?title=${title}`, { withCredentials: true }).catch((err: Error) => {
        console.log("Error: ", err);
    })
    if (response && response.data) return response.data[0];

}

export const downloadVideo = async (id: number) => {
    console.log(`${API_URL}video/download/${id}`);

    const response = await axios.get(`${API_URL}video/download/${id}`).catch((err: Error) => {
        console.log("Error: ", err);
    })
    console.log(response);
    if (response && response.data) return response.data[0];
}

export const getTrendingVideos = async () => {

    const response = await axios.get(`${API_URL}video/trending/now`).catch((err: Error) => {
        console.log("Error: ", err);
    })
    if (response && response.data) return response.data;
}
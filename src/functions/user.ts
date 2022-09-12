import axios from "axios"
import { API_URL } from "constants/constants"

export const fetchAuthUser = async () => {
    const response = await axios.get(`${API_URL}user`, { withCredentials: true }).catch((err: Error) => {
        console.log("Error: ", err);
    })

    if (response && response.data) {
        return response.data
    } else {
        return null;
    }
}

export const fetchModelProfil = async (username: string) => {
    const response = await axios.get(`${API_URL}user/${username}`).catch((err: Error) => {
        console.log("Error: ", err);
    })
    console.log(response);

    if (response && response.data) return response.data;
}

export const fetchModelProfilDashboard = async () => {
    const response = await axios.get(`${API_URL}dashboard/`, { withCredentials: true }).catch((err: Error) => {
        console.log("Error: ", err);
    })
    if (response && response.data) return response.data;
}

export const updateModelProfil = async (data: unknown) => {
    console.log("enter here");

    const response = await axios({
        method: "post",
        url: `${API_URL}dashboard/update`,
        withCredentials: true,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
    }).catch((err) => console.log(err));

    if (response && response.data) return response.data;
}

export const fetchModels = async (search = "", limit: number = 25, offset: number = 0) => {
    console.log("Making request...");

    const response = await axios.get(`${API_URL}models/?search=${search}&limit=${limit}&offset=${offset}`).catch((err: Error) => {
        console.log("Error: ", err);
    })
    console.log("My request", response);

    if (response && response.data) return response.data;
}

export const fetchLatestModels = async () => {
    const response = await axios.get(`${API_URL}models/latest`).catch((err: Error) => {
        console.log("Error: ", err);
    })
    console.log("My request", response);

    if (response && response.data) return response.data;
}
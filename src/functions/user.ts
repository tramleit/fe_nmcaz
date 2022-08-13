import axios from "axios"
import { API_URL } from "constants/constants"

export const fetchAuthUser = async () => {
    const response = await axios.get(`http://localhost:5000/user`, { withCredentials: true }).catch((err: Error) => {
        console.log("Error: ", err);
    })

    if (response && response.data) {
        return response.data
    } else {
        return null;
    }
}

export const fetchModelProfil = async (username: string) => {
    const response = await axios.get(`http://localhost:5000/user/${username}`).catch((err: Error) => {
        console.log("Error: ", err);
    })
    if (response && response.data) return response.data;
}

export const fetchModelProfilDashboard = async () => {
    const response = await axios.get(`http://localhost:5000/dashboard/`, { withCredentials: true }).catch((err: Error) => {
        console.log("Error: ", err);
    })
    if (response && response.data) return response.data;
}

export const updateModelProfil = async (data: unknown) => {
    console.log("enter here");

    const response = await axios.post(`http://localhost:5000/dashboard/update`, { data: data }, { withCredentials: true }).catch((err: Error) => {
        console.log("Error: ", err);
    })
    if (response && response.data) return response.data;
}
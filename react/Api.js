import axios from 'axios';
import {toastShow} from "./layout/toast";
import {useNavigate} from "react-router-dom";

export const createUser = async (payload) => {
    try {
        const response = await axios.post(`/api/user/create`, payload);

        if (response.data.response !== 'error') {
            setTimeout(() => {
                window.location.href = '/login';
            }, 3000);
        }

        toastShow(response.data.response, response.data.message);
    } catch (err) {
        toastShow("error", err.response?.data.message || "An error occurred");
    }
}
export const createNotes = async (payload,token) => {
    const { data } = await axios.post(`/api/notes/create`, payload,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    toastShow(data.response,data.message);
}

export const loginUser = async (payload) => {
    try {
        const response = await axios.post(`/api/login`, payload);
        const token = response.data.token;
        localStorage.setItem("token", token);
        setAuthToken(token);
        if (response.data.response !== 'error') {
            toastShow("success", "Logged in successfully.");
            setTimeout(() => {
                window.location.href = '/notes';
            }, 500);
        }
        return response.data;
    } catch (err) {
        toastShow("error", err.response?.data.message || "An error occurred");
        return { response: 'error', message: 'An error occurred' };
    }
};


export const logout = () => {
    localStorage.removeItem("token");
}

export const getListOfCategories = async (token) => {
    const { data } = await axios.get(`/api/category/list`,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    return data.data
}

export const getListOfNotes = async (token) => {
    try {
        const { data } = await axios.get(`/api/notes/list`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        
        if (data.response === 'error') {
            logout();
            setTimeout(() => {
                window.location.href = '/login';
            }, 1000);
        }

        return data.data;
    } catch (error) {
        // Handle errors (e.g., show an error message)
        toastShow("error", "An error occurred");
        return null; // or handle the error in a different way based on your needs
    }
};

export const filterRows = async (token,type,value) => {
    const { data } = await axios.get(`/api/notes/filter?${type}=${value}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    return data.data
}



export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}

export const confirmUserAccount = async (confirmationToken) => {
    try {
        const response = await axios.get(`/confirm/${confirmationToken}`);
        toastShow(response.data.response, response.data.message);

        // if (response.data.response !== 'error') {
        //     setTimeout(() => {
        //         window.location.href = '/login';
        //     }, 2000);
        // }

        return response.data;
    } catch (err) {
        console.log(err)
        toastShow("error", err.response?.data.message || "An error occurred");
        return { response: 'error', message: 'An error occurred' };
    }
};


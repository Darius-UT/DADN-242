import axios from './axios.customize';
import AsyncStorage from '@react-native-async-storage/async-storage';


const loginAPI = (data: any) => {
    const URL_BACKEND = "api/v1/login"
    return axios.post(URL_BACKEND, data)
}


const getUser = (token:any) => {
    const URL_BACKEND = "api/v1/user/getUser"
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.get(URL_BACKEND, config)
}

const sendOTP = (data: any) => {
    const URL_BACKEND = "api/v1/reset-password"
    return axios.post(URL_BACKEND, data)
}
const resetPassword  = (data: any) => {
    const URL_BACKEND = "api/v1/reset-password"
    return axios.put(URL_BACKEND, data)
}

const updateUser = (token:any, id:any, data: any) => {
    const URL_BACKEND = `api/v1/user/updateUser/${id}`
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.put(URL_BACKEND, data, config)
}

const addUser = (token:any, data: any) => {
    const URL_BACKEND = "api/v1/admin/users"
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.post(URL_BACKEND, data, config)
}

const getUserByRole = (token:any, role:any) => {
    const URL_BACKEND = `api/v1/admin/users/role/${role}`
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.get(URL_BACKEND, config)
}

const addDevice = (token:any, data: any) => {
    const URL_BACKEND = "api/v1/devices/add_device"
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.post(URL_BACKEND, data, config)
}

const addZone = (token:any, data: any) => {
    const URL_BACKEND = "api/v1/zone"
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.post(URL_BACKEND, data, config)
}

const getAllHistoryLogs = (token:any) => {
    const URL_BACKEND = "api/v1/history-logs"
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.get(URL_BACKEND, config)
}

export {loginAPI, getUser, sendOTP, resetPassword, updateUser, addUser, getUserByRole, addDevice, addZone, getAllHistoryLogs};
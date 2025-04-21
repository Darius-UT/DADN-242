import axios from './axios.customize';
import AsyncStorage from '@react-native-async-storage/async-storage';


const loginAPI = (data: any) => {
    const URL_BACKEND = "api/v1/login"
    return axios.post(URL_BACKEND, data)
}
// await AsyncStorage.setItem('accessToken', response.data.token);
// await AsyncStorage.setItem('userId', String(response.data.id));
// await AsyncStorage.setItem('username', response.data.username);

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


export {loginAPI, getUser, sendOTP, resetPassword, updateUser};
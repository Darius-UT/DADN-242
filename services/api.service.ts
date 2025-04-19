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

export {loginAPI, getUser};
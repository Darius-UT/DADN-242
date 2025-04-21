// src/services/area.service.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './axios.customize';



export const updateStatusDevice = async (token:any, isEnabled: boolean, feedName: string) => {
    const URL_BACKEND = "api/v1/devices/updatestatus"
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        "Content-Type": "application/json",
    }

    const userName = await AsyncStorage.getItem("username")
    var status = "DISABLE"
    if(isEnabled) {
        status = "ENABLE"
    }
    const body = {
        userName,                       // "testuser1"
        feedName,                       // "soil-1"
        status: isEnabled ? "ENABLE" : "DISABLE",
      };
    return axios.patch(URL_BACKEND, body, config)
};

export const getStatusDevice = async (token:any, feedName: string) => {
    const URL_BACKEND = "api/v1/devices/getStatus?feedName=" + feedName
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        "Content-Type": "application/json",
    }


    return axios.get(URL_BACKEND, config)
}
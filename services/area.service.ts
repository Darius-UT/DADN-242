// src/services/area.service.ts
import axios from './axios.customize';



export const getAreas = async (token:any) => {
    const URL_BACKEND = "api/v1/zone"
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.get(URL_BACKEND, config)
};

export const getDevicesByArea = async (areaId: number | string, token:any) => {
    const URL_BACKEND = "api/v1/devices/zone/" + areaId
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  
    
    const res:any = await axios.get(URL_BACKEND, config)
 
    return res
}
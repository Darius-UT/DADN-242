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

const getAllZones = (token:any) => {
    const URL_BACKEND = "api/v1/zone"
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.get(URL_BACKEND, config)
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

const deleteUser = (token:any, id:any) => {
    const URL_BACKEND = `api/v1/admin/users/${id}`
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.delete(URL_BACKEND, config)
}

const addRule = (token:any, data: any) => {
    const URL_BACKEND = "api/v1/rules/create"
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.post(URL_BACKEND, data, config)
}

const getRulesByDevice = (token:any, feedName:string) => {
    const URL_BACKEND = `api/v1/rules/getRulesByDevice?feedName=${feedName}`
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.get(URL_BACKEND, config)
}

const updateRule = (token:any, id:any, data: any) => {
    const URL_BACKEND = `api/v1/rules/update?id=${id}`
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.put(URL_BACKEND, data, config)
}
const deleteRule = (token:any, id:any) => {
    const URL_BACKEND = `api/v1/rules/delete?id=${id}`
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.delete(URL_BACKEND, config)
}


const addConditionRule = (token:any,data: any) => {
    const URL_BACKEND = `api/v1/condition-rules/create`
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.put(URL_BACKEND, data, config)
}

const getConditionRuleByRuleId = (token:any, ruleId:any) => {
    const URL_BACKEND = `api/v1/condition-rules/getByRuleId?ruleId=${ruleId}`
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.get(URL_BACKEND, config)
}

const updateConditionRule = (token:any, id:any, data: any) => {
    const URL_BACKEND = `api/v1/condition-rules/update?id=${id}`
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.put(URL_BACKEND, data, config)
}

const deleteConditionRule = (token:any, id:any) => {
    const URL_BACKEND = `api/v1/condition-rules/delete?id=${id}`
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return axios.delete(URL_BACKEND, config)
}




export {loginAPI, getUser, sendOTP, resetPassword, 
    updateUser, addUser, getUserByRole, addDevice, 
    addZone,getAllZones , getAllHistoryLogs, deleteUser
    , addRule, getRulesByDevice, updateRule, deleteRule,
    addConditionRule, getConditionRuleByRuleId, updateConditionRule, deleteConditionRule
};
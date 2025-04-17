import axios from './axios.customize';

const loginAPI = (data: any) => {
    const URL_BACKEND = "api/v1/login"
    return axios.post(URL_BACKEND, data)
}

export {loginAPI};
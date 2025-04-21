// src/services/data.service.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios          from './axios.customize';

// ---------------------------------------------
// Hàm chung dựng header Bearer + Content‑Type
// ---------------------------------------------
const buildAuthConfig = async () => {
  const token = await AsyncStorage.getItem('accessToken');   // <‑– key bạn lưu token
  return {
    headers: { Authorization: `Bearer ${token}` },
    'Content-Type': 'application/json',
  } as const;
};

/* =========================================================
 * 1. LẤY DỮ LIỆU 1 NGÀY
 *    GET /api/v1/devices/data/oneday?feedName=soil-1
 * ========================================================= */
export const getDeviceDataOneDay = async (feedName: string) => {
  const URL = 'api/v1/devices/data/oneday';       // không cần dấu “/” đầu khi đã có baseURL
  const config = await buildAuthConfig();

  return axios.get(URL, { ...config, params: { feedName } });
};

/* =========================================================
 * 2. LẤY DỮ LIỆU 1 TUẦN
 *    GET /api/v1/devices/data/oneweek?feedName=soil-1
 * ========================================================= */
export const getDeviceDataOneWeek = async (feedName: string) => {
  const URL = 'api/v1/devices/data/oneweek?feedName='+feedName;
  
  const config = await buildAuthConfig();

  return axios.get(URL,config);
};

/* =========================================================
 * 3. LẤY DỮ LIỆU 1 THÁNG
 *    GET /api/v1/devices/data/onemonth?feedName=soil-1
 * ========================================================= */
export const getDeviceDataOneMonth = async (feedName: string) => {
  const URL = 'api/v1/devices/data/onemonth';
  const config = await buildAuthConfig();

  return axios.get(URL, { ...config, params: { feedName } });
};

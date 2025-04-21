import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './axios.customize';
// -------------------------------------------------------------------
// 1.  POST /api/v1/rules/create
// -------------------------------------------------------------------
/**
 * Tạo Rule điều khiển thiết bị (bật/tắt, v.v…)
 *
 * @param token     accessToken (Bearer)
 * @param action    ví dụ: "pump-2/off"
 * @param feedName  ví dụ: "soil-1"
 * @param userId    Nếu không truyền, hàm tự lấy từ AsyncStorage key "userId"
 */
export const createRule = async (
    action:   string,
    feedName: string,
    userId?:  number
  ) => {
    const URL = "/api/v1/rules/create";
    
    // nếu chưa truyền userId → lấy trong AsyncStorage
    const token = await AsyncStorage.getItem('accessToken');
    const finalUserId =
      userId ?? Number(await AsyncStorage.getItem("userId") || 0);
  
    const body = {
      action,           // "pump-2/off"
      feedName,         // "soil-1"
      userId: finalUserId,
    };
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  
    return axios.post(URL, body, config);
  };
  
  // -------------------------------------------------------------------
  // 2.  POST /api/v1/condition-rules/create
  // -------------------------------------------------------------------
  /**
   * Tạo Rule điều kiện (min/max value + thời gian hiệu lực)
   *
   * Các giá trị ngày nên ở dạng ISO string: "2025-04-08T00:00:00"
   */
  // JS Date (hoặc dayjs/moment)  ➜  "2025‑04‑30 21:00:00"
const toMysqlDateTime = (d: Date) =>
    d.toISOString().slice(0, 19).replace('T', ' ');      // UTC
  // nếu bạn muốn theo giờ VN:
const toMysqlDateTimeVN = (d: Date) =>
    new Date(d.getTime() - d.getTimezoneOffset()*60000)   // shift về local
      .toISOString().slice(0, 19).replace('T', ' ');
      
  export const createConditionRule = async (
    
      name: string,
      min_value: string,
      max_value: string,
      start_date: Date,
      end_date: Date    ,
      rule_id: number,
    
  ) => {
    const URL = "/api/v1/condition-rules/create";
    const token = await AsyncStorage.getItem('accessToken');
    const body = {
      name,
      min_value,
      max_value,
      start_date: start_date,
      end_date: end_date,
      rule_id,
    };
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  
    return axios.post(URL, body, config);
  };
  
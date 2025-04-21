import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import * as Home_Style from '@/styles/screens/home/home';
import Top_Header from '@/components/common/Top_Header';
import { useFonts } from 'expo-font';
import globalStyle from '@/styles/global';
import { SeeAll_Button } from '@/components/common/Button';
import { useNavigation } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import Login_TT_Style from '@/styles/screens/login/login-tt';
import ModalTemplate from '@/components/common/AddDevice';
import ModalAddDevice from '@/components/common/AddDevice';
import ModalAddZone from '@/components/common/AddZone';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllHistoryLogs } from '@/services/api.service';

const GreenHouse_Name = "Bách khoa";
const GreenHouse_Address = "268, Lý Thường Kiệt, P.14, Q.10, Tp Hồ Chí Minh";
const GreenHouse_Status = "Đang kết nối";

const deviceState_data = [
  { id: "1", deviceType: "Cảm biến ánh sáng", active: "10/12", error: "2/12" },
  { id: "2", deviceType: "Đèn LED", active: "10/12", error: "2/12" },
  { id: "3", deviceType: "Bơm bước", active: "5/5", error: "0/0" },
  { id: "4", deviceType: "Quạt thông gió", active: "4/5", error: "1/5" },
];


// CHỈ SỐ TỔNG QUAN
const GeneralValue = () => {
  const [] = useFonts({
    "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
  });

  const [isVisibleDevice, setModalVisibleDevice] = React.useState(false);
  const [isVisibleZone, setModalVisibleZone] = React.useState(false);

  return (
    <View>
      <TouchableOpacity
          style={Login_TT_Style.loginButton}
          onPress={() => setModalVisibleDevice(true)}>
          <Text style={Login_TT_Style.lastLoginText}>Thêm thiết bị</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={Login_TT_Style.loginButton}
        onPress={() => setModalVisibleZone(true)}>
        <Text style={Login_TT_Style.lastLoginText}>Thêm khu vực</Text>
      </TouchableOpacity>

      <ModalAddDevice
        isVisible={isVisibleDevice}
        setModalVisible={setModalVisibleDevice}
      />

      <ModalAddZone
        isVisible={isVisibleZone}
        setModalVisible={setModalVisibleZone}
      />
    </View>
  );
};


// HOẠT ĐỘNG GẦN ĐÂY
const LatelyHistoryLogs = () => {
  const [] = useFonts({
    "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
  });
  const [data, setData] = React.useState([]);

  const getAllLogs = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response :any = await getAllHistoryLogs(token);
      if (response && response.statusCode == 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllLogs();

  }, []);

  const notification = (noti_content: any, noti_time: string) => {
    const content = noti_content.username 
  ? `Người dùng ${noti_content.username} đã ${noti_content.action}` 
  : `Thiết bị ${noti_content.device} đã được ${noti_content.action}`;

    return (
      <TouchableOpacity style={Home_Style.LatelyNotification.noti_element_container}>
        <View style={Home_Style.LatelyNotification.noti_level}></View>

        <View style={Home_Style.LatelyNotification.noti_content_container}>
          <Text>{content}</Text>
          <Text style={Home_Style.LatelyNotification.noti_time}>{noti_time}</Text>
        </View>

        <Text style={Home_Style.LatelyNotification.noti_3dots}>...</Text>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation<any>();


  return (
    <View>
      <View style={Home_Style.GeneraValue.subTitleTextContainer}>
        <Text style={Home_Style.GeneraValue.subTitleText}>Hoạt động gần đây</Text>
      </View>

      <ScrollView
        style={{ paddingTop: 8 }}
        contentContainerStyle={Home_Style.LatelyNotification.scrollViewContainer}>
        {data.map((element: any) => (
          <View key={element.id}>
            {notification(element, formatTimeAgo(element.timestamp))}
          </View>
        ))}
      </ScrollView>

      <SeeAll_Button name="Xem toàn bộ" onPressed={() => navigation.navigate("RealTime")} />
    </View>
  );
};


// TRẠNG THÁI THIẾT BỊ
const DeviceState = () => {
  return (
    <View>
      <View style={Home_Style.GeneraValue.subTitleTextContainer}>
        <Text style={Home_Style.GeneraValue.subTitleText}>Trạng thái thiết bị</Text>
      </View>

      <View style={Home_Style.deviceState.tableContainer}>
        {/* Tiêu đề */}
        <View style={Home_Style.deviceState.headerRow}>
          <Text style={[Home_Style.deviceState.headerText]}>Loại thiết bị</Text>
          <Text style={[Home_Style.deviceState.headerText, Home_Style.deviceState.headerActive]}>Đang hoạt động</Text>
          <Text style={[Home_Style.deviceState.headerText, Home_Style.deviceState.headerError]}>Lỗi</Text>
        </View>
        {/* Dữ liệu */}
        <FlatList
          data={deviceState_data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={Home_Style.deviceState.listRow}>
              <Text style={[Home_Style.deviceState.listCell]}>{item.deviceType}</Text>
              <Text style={[Home_Style.deviceState.listCell, Home_Style.deviceState.active]}>{item.active}</Text>
              <Text style={[Home_Style.deviceState.listCell, Home_Style.deviceState.error]}>{item.error}</Text>
            </View>
          )}
          scrollEnabled={false}
        />
      </View>

    </View>
  );
};



const Home = () => {
  const [] = useFonts({
    "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
  });

  return (
    <View style={{paddingBottom: 60,}}>
      {/* Header */}
      <Top_Header></Top_Header>


      {/* Main Content */}
      <ScrollView
        style={{ padding: globalStyle.mainPadding.padding, backgroundColor: COLORS.white }}
        contentContainerStyle={Home_Style.default.mainContainer}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Tên nhà kính */}
        <View style={Home_Style.default.titleTextContainer}>
          <Text style={Home_Style.default.titleText}>Nhà kính {GreenHouse_Name}</Text>
        </View>

        {/* Thông tin & Trạng thái nhà kính */}
        <View style={Home_Style.default.inforStatusContainer}>
          <View style={Home_Style.default.subInforStatusContainer}>
            <View style={Home_Style.default.smallDotHeader}></View>
            <Text>{GreenHouse_Address}</Text>
          </View>
          <View style={Home_Style.default.subInforStatusContainer}>
            <View style={Home_Style.default.smallDotHeader}></View>
            <Text>{GreenHouse_Status}</Text>
          </View>
        </View>

        {/* Mục: Chỉ số tổng quan */}
        <GeneralValue />

        {/* Mục: Hoạt động gần đây */}
        <LatelyHistoryLogs />

        {/* Mục: Trạng thái thiết bị
        <DeviceState /> */}

      </ScrollView>
    </View>
  );
};


const formatTimeAgo = (timestamp:any) => {
  const now = new Date();
  const then = new Date(timestamp);
  const diff = now.getTime() - then.getTime(); // Difference in milliseconds

  const diffMinutes = Math.floor(diff / 1000 / 60); // Convert to minutes
  const diffHours = Math.floor(diff / 1000 / 60 / 60); // Convert to hours
  const diffDays = Math.floor(diff / 1000 / 60 / 60 / 24); // Convert to days
  const diffMonths = Math.floor(diffDays / 30); // Assuming 30 days per month
  const diffYears = Math.floor(diffDays / 365); // Assuming 365 days per year

  if (diffYears >= 1) {
    return `${diffYears} năm trước`;
  } else if (diffMonths >= 1) {
    return `${diffMonths} tháng trước`;
  } else if (diffDays >= 1) {
    return `${diffDays} ngày trước`;
  } else if (diffHours >= 1) {
    return `${diffHours} giờ trước`;
  } else if (diffMinutes >= 1) {
    return `${diffMinutes} phút trước`;
  } else {
    return 'Vừa xong';
  }
}



export default Home;

import React from 'react';
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

  const dataCard = (
    areaName: String,
    temperature: number,
    light: number,
    moisture: number,
    soil_moisture: number) => {
    return (
      <TouchableOpacity style={Home_Style.GeneraValue.dataCardContainer}>
        <View style={Home_Style.GeneraValue.dataCard_Area_Container}>
          <Text style={Home_Style.GeneraValue.dataCard_Area}>Khu {areaName}</Text>
        </View>

        <View>
          <View style={Home_Style.GeneraValue.dataCard_rowElement}>
            <Text style={Home_Style.GeneraValue.dataCard_nameElement}>Nhiệt độ</Text>
            <Text style={Home_Style.GeneraValue.dataCard_dataElement}>{temperature} ℃</Text>
          </View>
          <View style={Home_Style.GeneraValue.dataCard_rowElement}>
            <Text>Ánh sáng</Text>
            <Text>{light} Lux</Text>
          </View>
          <View style={Home_Style.GeneraValue.dataCard_rowElement}>
            <Text>Độ ẩm</Text>
            <Text>{moisture} %</Text>
          </View>
          <View style={Home_Style.GeneraValue.dataCard_rowElement}>
            <Text>Độ ẩm đất</Text>
            <Text>{soil_moisture} %</Text>
          </View>
        </View>
      </TouchableOpacity >
    );
  };

  return (
    <View>
      <View style={Home_Style.GeneraValue.subTitleTextContainer}>
        <Text style={Home_Style.GeneraValue.subTitleText}>Chỉ số tổng quan</Text>
      </View>

      <ScrollView
        style={{ maxHeight: 300, }}
        contentContainerStyle={Home_Style.GeneraValue.scrollViewContainer}
        onStartShouldSetResponderCapture={() => true}
        nestedScrollEnabled={true} >
        {dataCard("A", 23, 23, 43, 22)}
        {dataCard("B", 23, 23, 43, 22)}
        {dataCard("C", 23, 23, 43, 22)}
        {dataCard("D", 23, 23, 43, 22)}
      </ScrollView>
    </View>
  );
};



// CẢNH BÁO GẦN ĐÂY
const LatelyNotification = () => {
  const [] = useFonts({
    "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
  });

  const notification = (noti_content: String, noti_time: number) => {
    return (
      <TouchableOpacity style={Home_Style.LatelyNotification.noti_element_container}>
        <View style={Home_Style.LatelyNotification.noti_level}></View>

        <View style={Home_Style.LatelyNotification.noti_content_container}>
          <Text>{noti_content}</Text>
          <Text style={Home_Style.LatelyNotification.noti_time}>{noti_time} phút trước</Text>
        </View>

        <Text style={Home_Style.LatelyNotification.noti_3dots}>...</Text>
      </TouchableOpacity>
    );
  };


  return (
    <View>
      <View style={Home_Style.GeneraValue.subTitleTextContainer}>
        <Text style={Home_Style.GeneraValue.subTitleText}>Cảnh báo gần đây</Text>
      </View>

      <ScrollView
        style={{ paddingTop: 8 }}
        contentContainerStyle={Home_Style.LatelyNotification.scrollViewContainer}>
        {notification("Độ ẩm đất khu B dưới 30% lúc 14:35 ngày 18/02/25", 3)}
        {notification("Cảm biến ánh sáng A-L14 đã bị người khác giết hại.", 3)}
        {notification("Độ ẩm đất khu B dưới 30% lúc 14:35 ngày 18/02/25", 3)}
      </ScrollView>

      <TouchableOpacity style={Home_Style.LatelyNotification.expandButton}>
        <Text style={Home_Style.LatelyNotification.buttonText}>Xem toàn bộ thông báo</Text>
      </TouchableOpacity>
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
          renderItem={( {item} ) => (
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
    <ScrollView
      stickyHeaderIndices={[0]}
      keyboardShouldPersistTaps="handled"  // Cho phép chạm vào ScrollView con
      nestedScrollEnabled={true}          // Cho phép ScrollView lồng nhau (Android)
    >
      {/* Header */}
      <Top_Header></Top_Header>


      {/* Main Content */}
      <ScrollView
        style={{ padding: globalStyle.mainPadding.padding, }}
        nestedScrollEnabled={true} >
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

        {/* Mục: Cảnh báo gần đây */}
        <LatelyNotification />

        {/* Mục: Trạng thái thiết bị */}
        <DeviceState />

      </ScrollView>
    </ScrollView>
  );
};
export default Home;

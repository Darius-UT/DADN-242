import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native'
import Top_Header from '@/components/common/Top_Header';
import { SelectList } from 'react-native-dropdown-select-list';
import * as DataObservation_Style from '@/styles/screens/data-observation/dataObservation';
import { useFonts } from 'expo-font';
import * as Icon from "@/components/ui/IconSymbol";
import * as Home_Style from '@/styles/screens/home/home';
import GaugeChart from '@/components/common/GaugeChart';
import { ProgressChart } from "react-native-chart-kit";
import { SeeAll_Button } from '@/components/common/Button';
import { useNavigation } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { Dimensions } from 'react-native';
import LineChartTemplate from '@/components/common/LineChart';
import { getAreas } from '@/services/area.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const screenWidth = Dimensions.get('window').width;


const TemperatureSensor_GaugeData = [
  { id: "1", value: 36, min: 0, max: 100, name: "Cảm biến nhiệt độ A-T1" },
  { id: "2", value: 20, min: 0, max: 100, name: "Cảm biến nhiệt độ A-T2" },
  { id: "3", value: 40, min: 0, max: 100, name: "Cảm biến nhiệt độ A-T3" },
  { id: "4", value: 80, min: 0, max: 100, name: "Cảm biến nhiệt độ A-T4" },
  { id: "5", value: 12, min: 0, max: 100, name: "Cảm biến nhiệt độ A-T5" },
]

const TemperatureSensor_LineData1 = [
  { value: 15, label: '00:00' },
  { value: 20, label: '01:00' },
  { value: 24, label: '02:00' },
  { value: 20, label: '03:00' },
  { value: 18, label: '04:00' },
  { value: 29, label: '05:00' },
  { value: 30, label: '06:00' },
  { value: 34, label: '07:00' },
  { value: 35, label: '08:00' },
  { value: 39, label: '09:00' },
  { value: 29, label: '10:00' },
  { value: 32, label: '11:00' },
];

const TemperatureSensor_LineData2 = [
  { value: 20, label: '00:00' },
  { value: 24, label: '01:00' },
  { value: 25, label: '02:00' },
  { value: 24, label: '03:00' },
  { value: 20, label: '04:00' },
  { value: 19, label: '05:00' },
  { value: 20, label: '06:00' },
  { value: 24, label: '07:00' },
  { value: 25, label: '08:00' },
  { value: 24, label: '09:00' },
  { value: 20, label: '10:00' },
  { value: 19, label: '11:00' },
];

const TemperatureSensor_LineData3 = [
  { value: 30, label: '00:00' },
  { value: 34, label: '01:00' },
  { value: 35, label: '02:00' },
  { value: 39, label: '03:00' },
  { value: 29, label: '04:00' },
  { value: 32, label: '05:00' },
  { value: 15, label: '06:00' },
  { value: 20, label: '07:00' },
  { value: 24, label: '08:00' },
  { value: 20, label: '09:00' },
  { value: 18, label: '10:00' },
  { value: 29, label: '11:00' },
];
// DataSet
const TemperatureDataSets = [
  { data: TemperatureSensor_LineData1, label: "A", color: "rgba(0, 133, 27, 0.8)", pointColor: "rgb(0, 51, 10)" },
  { data: TemperatureSensor_LineData2, label: "B", color: "rgba(17, 128, 188, 0.8)", pointColor: "rgb(0, 48, 73)" },
  { data: TemperatureSensor_LineData3, label: "C", color: "rgba(255, 99, 71, 0.8)", pointColor: "rgb(139, 0, 0)" },
];

const ProgressChartData = {
  labels: ["Cảm biến nhiệt độ", "Cảm biến ánh sáng", "Cảm biến độ ẩm", "Cảm biến độ ẩm đất"], // optional
  data: [0.4, 0.6, 0.2, 0.8],
  colors: ["rgba(5,7,181, 1)", "rgba(5,7,181, 0.8)", "rgba(5,7,181, 0.6)", "rgba(5,7,181, 0.4)"],
};


// Thành phần 1: Bảng lựa chọn khu vực
type Option = { key: string; value: string }
// 1) meta cho mọi loại cảm biến
const SENSOR_META = [
  { type: "temp",  label: "Nhiệt độ",          min: 0,   max: 100 },
  { type: "light", label: "Ánh sáng",          min: 0,   max: 10000 },
  { type: "air",   label: "Độ ẩm không khí",   min: 0,   max: 100 },
  { type: "soil",  label: "Độ ẩm đất",         min: 0,   max: 100 },
];

// hàm sinh gauge cho 1 zone
const buildGauges = (zoneId: string) =>
  SENSOR_META.map(m => ({
    id:     `${m.type}-${zoneId}`,
    feed:   `${m.type}-${zoneId}`,
    name:   `${m.label} ${m.type}-${zoneId}`,
    min:    m.min,
    max:    m.max,
    value:  0,
  }));
type Gauge = ReturnType<typeof buildGauges>[number];

const AreaSelectList: React.FC<{
  onSelect: (zoneId: string) => void
}> = ({ onSelect }) => {
  const [selected, setSelected]   = React.useState<string>("");
  const [dataList, setDataList]   = React.useState<Option[]>([]);
  React.useEffect(() => {
    (async () => {
      try {
        const token      = await AsyncStorage.getItem("accessToken");
        const { data }   = await getAreas(token);
        const formatted  = data.map((it:any)=>({ key: it.id.toString(), value:`Khu vực ${it.name}` }));
        setDataList(formatted);
      } catch (err) {
        console.log("Không tải được danh sách khu vực:", err);
      }
    })();
  }, []);


  return (
    <View style={DataObservation_Style.AreaSelectedList_Style.selectListContainer}>
      <SelectList
        data={dataList}
        save="key"                           // trả về id
        setSelected={(k:string)=>{
          setSelected(k);
          onSelect(k);                       // báo về cha
        }}

        boxStyles={DataObservation_Style.AreaSelectedList_Style.selectListBox}
        placeholder="Chọn khu vực"
        searchPlaceholder="Tìm kiếm"

        inputStyles={DataObservation_Style.AreaSelectedList_Style.selectInputText}

        arrowicon={<Icon.ArrowDown />}
        closeicon={<Icon.Cross />}
        searchicon={<Icon.Search />}

        dropdownStyles={DataObservation_Style.AreaSelectedList_Style.selectListDropDownBox}
      />
    </View>

  );
};

// Thành phần 2: Giá trị trung bình
const AverageData  = () => {
  const [] = useFonts({
    "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
  });

  const TemperatureCard = (mainData: number, time1: number, time2: number) => {
    return (
      <TouchableOpacity style={DataObservation_Style.AverageData_Style.dataCard}>
        <View style={DataObservation_Style.AverageData_Style.cardName}>
          <Text style={DataObservation_Style.AverageData_Style.cardNameText}>Nhiệt độ</Text>
        </View>

        <View style={DataObservation_Style.AverageData_Style.content}>

          <View style={DataObservation_Style.AverageData_Style.mainContent}>
            <View style={DataObservation_Style.AverageData_Style.mainData}>
              <Text style={DataObservation_Style.AverageData_Style.mainDataText}>{mainData}</Text>
            </View>
            <View style={DataObservation_Style.AverageData_Style.subMainData}>
              <Icon.Degree />
              <Text style={DataObservation_Style.AverageData_Style.subMainDataText}>C</Text>
            </View>
          </View>

          <View style={DataObservation_Style.AverageData_Style.subMainContent}>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>1 phút trước: {time1}</Text>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>30 phút trước: {time2}</Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  };

  const LightCard = (mainData: number, time1: number, time2: number) => {
    return (
      <TouchableOpacity style={DataObservation_Style.AverageData_Style.dataCard}>
        <View style={DataObservation_Style.AverageData_Style.cardName}>
          <Text style={DataObservation_Style.AverageData_Style.cardNameText}>Ánh sáng</Text>
        </View>

        <View style={DataObservation_Style.AverageData_Style.content}>

          <View style={DataObservation_Style.AverageData_Style.mainContent}>
            <View style={DataObservation_Style.AverageData_Style.mainData}>
              <Text style={DataObservation_Style.AverageData_Style.mainDataText}>{mainData}</Text>
            </View>
            <View style={DataObservation_Style.AverageData_Style.subMainData}>
              <Text style={DataObservation_Style.AverageData_Style.subMainDataText}>Lux</Text>
            </View>
          </View>

          <View style={DataObservation_Style.AverageData_Style.subMainContent}>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>1 phút trước: {time1}</Text>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>30 phút trước: {time2}</Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  };

  const MoistureCard = (mainData: number, time1: number, time2: number) => {
    return (
      <TouchableOpacity style={DataObservation_Style.AverageData_Style.dataCard}>
        <View style={DataObservation_Style.AverageData_Style.cardName}>
          <Text style={DataObservation_Style.AverageData_Style.cardNameText}>Độ ẩm</Text>
        </View>

        <View style={DataObservation_Style.AverageData_Style.content}>

          <View style={DataObservation_Style.AverageData_Style.mainContent}>
            <View style={DataObservation_Style.AverageData_Style.mainData}>
              <Text style={DataObservation_Style.AverageData_Style.mainDataText}>{mainData}</Text>
            </View>
            <View style={DataObservation_Style.AverageData_Style.subMainData}>
              <Text style={DataObservation_Style.AverageData_Style.subMainDataText}>%</Text>
            </View>
          </View>

          <View style={DataObservation_Style.AverageData_Style.subMainContent}>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>1 phút trước: {time1}</Text>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>30 phút trước: {time2}</Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  };

  const SoilMoistureCard = (mainData: number, time1: number, time2: number) => {
    return (
      <TouchableOpacity style={DataObservation_Style.AverageData_Style.dataCard}>
        <View style={DataObservation_Style.AverageData_Style.cardName}>
          <Text style={DataObservation_Style.AverageData_Style.cardNameText}>Độ ẩm đất</Text>
        </View>

        <View style={DataObservation_Style.AverageData_Style.content}>

          <View style={DataObservation_Style.AverageData_Style.mainContent}>
            <View style={DataObservation_Style.AverageData_Style.mainData}>
              <Text style={DataObservation_Style.AverageData_Style.mainDataText}>{mainData}</Text>
            </View>
            <View style={DataObservation_Style.AverageData_Style.subMainData}>
              <Text style={DataObservation_Style.AverageData_Style.subMainDataText}>%</Text>
            </View>
          </View>

          <View style={DataObservation_Style.AverageData_Style.subMainContent}>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>1 phút trước: {time1}</Text>
            <Text style={DataObservation_Style.AverageData_Style.subMainContentText}>30 phút trước: {time2}</Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View>
      <View style={Home_Style.GeneraValue.subTitleTextContainer}>
        <Text style={Home_Style.GeneraValue.subTitleText}>Giá trị trung bình</Text>
      </View>

      <View style={DataObservation_Style.AverageData_Style.cardContainer}>
        {TemperatureCard(30, 28, 29)}
        {LightCard(3000, 2800, 2900)}
        {MoistureCard(70, 71, 65)}
        {SoilMoistureCard(40, 45, 34)}
      </View>
    </View>
  );
};

// Thành phần 3: Biểu đồ thời gian thực
const RealTimeChart:React.FC<{ zoneId: string }> = ({zoneId }) => {
  const navigation = useNavigation<any>();
  const [gauges, setGauges] = useState<Gauge[]>([]);
  React.useEffect(() => {
    let stompClient: Client;
    if (!zoneId){
      console.log("Chưa chọn khu vực nào.")
      return;
    }  
    setGauges(buildGauges(zoneId));
    (async () => {
      
      console.log("Kết nối đến WebSocket...");
      // 1. Lấy token
      const token = await AsyncStorage.getItem('accessToken');

      // 2. Chọn host đúng cho emulator vs device
      
      // Ở Spring Boot SockJS endpoint mặc định bạn truy cập ws://.../ws/websocket
      const wsUrl = `ws://192.168.1.10:9090/ws?token=${token}`;

      // 3. Khởi tạo STOMP Client
      stompClient = new Client({
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,
        // dùng brokerURL sẽ xài WebSocket native
        brokerURL: wsUrl,
        reconnectDelay: 5000,
        debug: msg => console.log('[STOMP]', msg),
        // onConnect thay vì subscribe trong option
        onConnect: (frame: any) => {
          console.log('STOMP Connected:', frame);
          stompClient.subscribe('/topic/'+zoneId, (msg: any) => {
            console.log('Received:', msg.body);
            try {
              const { feedName, value } = JSON.parse(msg.body);   // {"feedName":"light-1", ...}
        
              setGauges(prev =>
                prev.map(g =>
                  g.feed === feedName ? { ...g, value } : g
                )
              );
        
            } catch (err) {
              console.warn("Message parse error:", err);
            }
          });
        },
        onStompError: err => console.error('STOMP error', err),
      });

      // 4. Kích hoạt
      stompClient.activate();
    })();

    // Cleanup
    return () => {
      stompClient?.deactivate();
      console.log('STOMP Disconnected');
    };
  }, [zoneId]);

  return (
    <View>
      <View style={Home_Style.GeneraValue.subTitleTextContainer}>
        <Text style={Home_Style.GeneraValue.subTitleText}>Biểu đồ thời gian thực</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 220 }}
        contentContainerStyle={DataObservation_Style.RealTimeChart_Style.container}
      >
        {gauges.map(g => (
          <GaugeChart
            key={g.id}
            value={g.value}
            min={g.min}
            max={g.max}
            name={`${g.name}`}  // “Cảm biến nhiệt độ temp-1”, …
          />
        ))}
      </ScrollView>

      <SeeAll_Button name="Xem toàn bộ" onPressed={() => navigation.navigate("RealTime")} />
    </View>
  );
};

// Thành phần 4: Biểu đồ xu hướng
const TrendingChart = () => {
  const navigation = useNavigation<any>();

  return (
    <View>
      <View style={Home_Style.GeneraValue.subTitleTextContainer}>
        <Text style={Home_Style.GeneraValue.subTitleText}>Biểu đồ xu hướng</Text>
      </View>

      <View style={DataObservation_Style.TrendingChart_Style.chartContainer}>
        <LineChartTemplate dataSets={TemperatureDataSets} chartTitle={"Giá trị của cảm biến nhiệt độ giữa các khu vực."} />
      </View>

      <SeeAll_Button name="Xem toàn bộ" onPressed={() => navigation.navigate("Trending")} />
    </View>
  );
};

// Thành phần 5: Biểu đồ tỷ lệ vượt ngưỡng
const OverThresoldChart = ({ areaName }: { areaName: string }) => {
  return (
    <View>
      <View style={Home_Style.GeneraValue.subTitleTextContainer}>
        <Text style={Home_Style.GeneraValue.subTitleText}>Biểu đồ tỷ lệ vượt ngưỡng</Text>
      </View>

      <View style={DataObservation_Style.OverThresoldChart_Style.progressChartContainer}>
        <ProgressChart
          width={screenWidth - 10}
          height={255}
          data={ProgressChartData}
          strokeWidth={18}
          radius={40}
          chartConfig={{
            backgroundColor: COLORS.white,
            backgroundGradientFrom: COLORS.white,
            backgroundGradientTo: COLORS.white,
            color: (opacity = 1) => `rgba(5, 20, 120, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          hideLegend={true}
        />
        <View style={DataObservation_Style.OverThresoldChart_Style.noteContainer}>
          {ProgressChartData.labels.map((label, index) => (
            <View key={index} style={DataObservation_Style.OverThresoldChart_Style.noteElementContainer}>
              <View
                style={{
                  width: 35,
                  height: 15,
                  backgroundColor: ProgressChartData.colors[index], // Lấy màu tương ứng
                  marginRight: 5,
                  borderRadius: 10,
                }}
              />
              <Text>{label}</Text>
            </View>
          ))}
        </View>
        <View>
          <Text style={DataObservation_Style.TrendingChart_Style.lineChartName}>Tỷ lệ số lần vượt ngưỡng của các cảm biến {areaName}.</Text>
        </View>
      </View>
    </View>
  );
};

// GIAO DIỆN CHÍNH - QUAN SÁT DỮ LIỆU
const DataObservation = () => {
  const [] = useFonts({
    "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
  });
  const [selectedZone, setSelectedZone] = React.useState<string>("");
  return (
    <View>
      {/* Header */}
      <Top_Header />

      {/* Data Observation */}
      <ScrollView
        style={{ backgroundColor: COLORS.background }}
        contentContainerStyle={DataObservation_Style.default.scrollView}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Header */}
        <View style={DataObservation_Style.default.headerContainer}>
          <Text style={DataObservation_Style.default.textHeader}>Quan sát dữ liệu</Text>
        </View>

        {/* SelectList: Chọn khu vực */}
        <AreaSelectList onSelect={(id) => setSelectedZone(id)}  />

        {/* Mục: Giá trị trung bình */}
        <AverageData />

        {/* Mục: Biểu đồ thời gian thực */}
        <RealTimeChart zoneId={selectedZone}/>

        {/* Mục: Biểu đồ xu hướng */}
        <TrendingChart />

        {/* Mục: Biểu đồ tỷ lệ vượt ngưỡng */}
        <OverThresoldChart areaName={"khu A"} />
      </ScrollView>

    </View>
  );
};

export default DataObservation;
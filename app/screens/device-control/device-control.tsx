import ModalAddDevice from "@/components/common/AddDevice";
import ModalAddZone from "@/components/common/AddZone";
import Top_Header from "@/components/common/Top_Header";
import { getAreas } from "@/services/area.service";
import * as DataObservation_Style from "@/styles/screens/data-observation/dataObservation";
import * as DeviceControlScreen_Style from "@/styles/screens/device-control/deviceControl";
import Login_TT_Style from "@/styles/screens/login/login-tt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// ---------- types ----------
interface Area {
  id: number | string;
  name: string;
}

interface CardAreaTemplateProps {
  areaId: number | string;
  nameArea: string;
}

// ---------- card ----------
const CardAreaTemplate: React.FC<CardAreaTemplateProps> = ({ areaId, nameArea }) => {
  useFonts({
    "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-SemiBold":  require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
  });

  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={DeviceControlScreen_Style.CardAreaTemplate_Style.mainContainer}
      onPress={() => navigation.push("DeviceArea", { areaId, areaName: nameArea })}
    >
      <View style={DeviceControlScreen_Style.CardAreaTemplate_Style.areaTextContainer}>
        <Text style={DeviceControlScreen_Style.CardAreaTemplate_Style.areaText}>
          Khu {nameArea}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


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




// ---------- screen ----------
const DeviceControlScreen = () => {
  useFonts({
    "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
    "Roboto-SemiBold":  require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
  });
  const [zones, setZones] = React.useState([]);

  const [areas, setAreas] = React.useState<Area[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        const { data } = await getAreas(token);
        setAreas(data as Area[]);
      } catch (err) {
        console.log("Không tải được danh sách khu vực:", err);
      }
    })();
  }, []);

  return (
    <View>
      <Top_Header />

      <View style={DeviceControlScreen_Style.default.overallContainer}>
        <View style={DataObservation_Style.default.headerContainer}>
          <Text style={DataObservation_Style.default.textHeader}>Điều khiển thiết bị</Text>
        </View>

        <View style={DeviceControlScreen_Style.default.cardContainer}>
          {areas.map(a => (
            <CardAreaTemplate key={a.id} areaId={a.id} nameArea={a.name} />
          ))}
        </View>
      </View>
      <GeneralValue/>
    </View>
  );
};

export default DeviceControlScreen;

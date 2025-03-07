import {
  View,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
} from 'react-native'
import Top_Header from '@/components/common/Top_Header';
import * as DataObservation_Style from '@/styles/screens/data-observation/dataObservation';
import { useFonts } from 'expo-font';

const DataObservation = () => {
  const [] = useFonts({
      "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
      "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    });

  return(
    <View>
      {/* Header */}
      <Top_Header/>

      {/* Data Observation */}
      <ScrollView>
        {/* Header */}
        <View style={DataObservation_Style.default.headerContainer}>
          <Text style={DataObservation_Style.default.textHeader}>Quan sát dữ liệu</Text>
        </View>

        <TouchableOpacity>
          <Text>Chọn khu vực</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
};

export default DataObservation;
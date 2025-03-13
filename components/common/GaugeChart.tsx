import { COLORS } from '@/constants/Colors';
import { TYPOGRAPHY } from '@/constants/Fonts';
import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';

const GaugeChart = ({ value = 30, min = 0, max = 100, unit = "°C", name = "Biểu đồ"}) => {
  const radius = 80;
  const strokeWidth = 15;
  const centerX = 100;
  const centerY = 100;
  const angleRange = Math.PI;
  const startAngle = -Math.PI; 
  const percent = (value - min) / (max - min);
  const endAngle = startAngle + angleRange * percent;

  // Tính toán vị trí kim
  const needleLength = radius - 10;
  const needleX = centerX + needleLength * Math.cos(endAngle);
  const needleY = centerY + needleLength * Math.sin(endAngle);

  // Tính toán vòng cung
  const arcStartX = centerX + radius * Math.cos(startAngle);
  const arcStartY = centerY + radius * Math.sin(startAngle);
  const arcEndX = centerX + radius * Math.cos(endAngle);
  const arcEndY = centerY + radius * Math.sin(endAngle);
  const largeArcFlag = 0;
  const pathData = `M ${arcStartX} ${arcStartY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${arcEndX} ${arcEndY}`;

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width="200" height="120">
        {/* Vòng cung nền */}
        <Path
          d={`M ${arcStartX} ${arcStartY} A ${radius} ${radius} 0 1 1 ${centerX + radius * Math.cos(startAngle + Math.PI)} ${centerY + radius * Math.sin(startAngle + Math.PI)}`}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Vòng cung giá trị */}
        <Path d={pathData} stroke="#5a2ca0" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />

        {/* Kim đồng hồ */}
        <Line x1={centerX} y1={centerY} x2={needleX} y2={needleY} stroke="#5a2ca0" strokeWidth={5} strokeLinecap="round" />

        {/* Chấm tròn trung tâm */}
        <Circle cx={centerX} cy={centerY} r={5} fill="#5a2ca0" />
      </Svg>

      {/* Giá trị hiển thị */}
      <Text style={{ fontSize: TYPOGRAPHY.subTitleFontSize, fontWeight: 'bold', marginTop: -10 }}>
        {value}{unit}
      </Text>

      <Text style={{ fontSize: TYPOGRAPHY.baseFontSize + 2, fontWeight: 'bold', marginTop: -10, color: COLORS.textPrimary, paddingTop: 10 }}>{name}</Text>
    </View>
  );
};

export default GaugeChart;

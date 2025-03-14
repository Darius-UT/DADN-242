import { COLORS } from '@/constants/Colors';
import { TYPOGRAPHY } from '@/constants/Fonts';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';



// Định nghĩa kiểu dữ liệu cho từng điểm trên biểu đồ
interface DataPoint {
    value: number;
}

// Định nghĩa kiểu dữ liệu cho từng đường (line) trong biểu đồ
interface LineDataSet {
    label: string;
    data: DataPoint[];
    color?: string;         // Màu của đường biểu đồ
    pointColor?: string;    // Màu của các điểm dữ liệu
}

// Props cho component CustomLineChart
interface CustomLineChartProps {
    dataSets: LineDataSet[];
    chartTitle?: string;
}

const LineChartTemplate: React.FC<CustomLineChartProps> = ({ dataSets, chartTitle }) => {
    const scrollRef = useRef(null);

    // Lấy tất cả giá trị từ các dataSets để tìm min/max
    const allValues = dataSets.flatMap(set => set.data.map(point => point.value));
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    // Mở rộng khoảng min/max để đảm bảo tất cả đường được hiển thị đầy đủ
    const yMin = minValue - 5;
    const yMax = maxValue + 5;

    return (
        <View style={LineChartTemplate_Style.container}>
            <LineChart
                data={dataSets[0]?.data || []}
                {...(dataSets.length > 1 && { data2: dataSets[1]?.data })}
                {...(dataSets.length > 2 && { data3: dataSets[2]?.data })}
                {...(dataSets.length > 3 && { data4: dataSets[3]?.data })}
                {...(dataSets.length > 4 && { data5: dataSets[4]?.data })}

                thickness={3}
                height={300}
                spacing={50}
                curved

                // Gán màu sắc cho từng đường biểu đồ
                {...dataSets.reduce((acc, set, index) => {
                    acc[`color${index + 1}`] = set.color || 'blue';
                    acc[`dataPointsColor${index + 1}`] = set.pointColor || 'red';
                    return acc;
                }, {} as Record<string, string>)}

                dataPointsRadius={4}

                // Lưới và focus
                showVerticalLines
                verticalLinesColor="rgba(0, 0, 0, 0.1)"
                xAxisColor="rgba(0, 0, 0, 0.2)"
                yAxisColor="rgba(0, 0, 0, 0.2)"
                focusEnabled

                adjustToWidth
                yAxisOffset={yMin}
                maxValue={(yMax - yMin)}

                scrollRef={scrollRef}
            />

            <View style={LineChartTemplate_Style.legendContainer}>
                {dataSets.map((set, index) => (
                    <View key={index} style={LineChartTemplate_Style.legendItem}>
                        <View style={[LineChartTemplate_Style.legendColor, { backgroundColor: set.color || 'blue' }]} />
                        <Text style={LineChartTemplate_Style.legendText}>{`Khu ${set.label}` || `Khu ${index + 1}`}</Text>
                    </View>
                ))}
            </View>

            {chartTitle && <Text style={LineChartTemplate_Style.lineChartName}>{chartTitle}</Text>}
        </View>

    );
};

export default LineChartTemplate;




const LineChartTemplate_Style = StyleSheet.create({
    container: {
        // height: 500,
        paddingTop: 10,
        flexDirection: "column",
        alignItems: "center",
        rowGap: 8,
    },
    
    lineChartName: {
        color: COLORS.textPrimary,
        fontWeight: 500,
    },

    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        flexWrap: 'wrap'
    },

    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        marginBottom: 5
    },

    legendColor: {
        width: 14,
        height: 14,
        borderRadius: 7,
        marginRight: 5
    },

    legendText: {
        fontSize: 14,
        color: '#333',
    }
});
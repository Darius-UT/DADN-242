import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EngineerUserList_Screen from '@/app/screens/adminScreens/user_list/EngineerUserList';
import AdminUserList_Screen from '@/app/screens/adminScreens/user_list/AdminUserList';
import { COLORS } from '@/constants/Colors';
import { View } from 'react-native';
import Top_Header from '@/components/common/Top_Header';
import { TYPOGRAPHY } from '@/constants/Fonts';

const Tab = createMaterialTopTabNavigator();

export default function AdminSwipeTabs() {
    return (
        <View
            style={{
                // height: 1000,
                flex: 1,
            }}>
            <Top_Header></Top_Header>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: { backgroundColor: COLORS.lightSecondary },
                    tabBarLabelStyle: { fontSize: TYPOGRAPHY.subTitleFontSize - 3, fontWeight: "bold", color: COLORS.textPrimary },
                    tabBarIndicatorStyle: { backgroundColor: COLORS.primary, height: 3 },
                    swipeEnabled: true, 
                    lazy: true,
                }}
            >
                <Tab.Screen name="Kỹ thuật viên" component={EngineerUserList_Screen} />
                <Tab.Screen name="Quản trị viên" component={AdminUserList_Screen} />
            </Tab.Navigator>
        </View>

    );
}
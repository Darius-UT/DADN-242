import DeviceControlScreen from '@/app/screens/device-control/device-control';
import DeviceAreaScreen from '@/app/screens/device-control/deviceArea';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

const DeviceStack = createStackNavigator();

export default function DeviceStackNavigator() {
    return (
        <DeviceStack.Navigator initialRouteName='DeviceControl' screenOptions={{ headerShown: false }}>
            <DeviceStack.Screen name="DeviceControl" component={DeviceControlScreen} />
            <DeviceStack.Screen name="DeviceArea" component={DeviceAreaScreen} />
        </DeviceStack.Navigator>
    );
};
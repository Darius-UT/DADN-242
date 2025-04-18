import { TouchableOpacity } from "react-native";
import { View, Image, StyleSheet } from "react-native";
import Small_Logo from "./Small_Logo";
import { SafeAreaView } from "react-native-safe-area-context";
import AddCircle from '@/assets/icons/topHeader/add_circle.svg';
import Notification from '@/assets/icons/topHeader/notification.svg';
import Search from '@/assets/icons/topHeader/search-normal.svg';
import { SPACING } from "@/constants/Spaces";
import React from "react";
import { useNavigation } from "expo-router";

const Top_Header = () => {
    const myNavigation = useNavigation<any>();

    return (
        <SafeAreaView style={Top_Header_Style.container}>
            <Small_Logo></Small_Logo>
            <View style={Top_Header_Style.utilities}>
                <TouchableOpacity>
                    <AddCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => myNavigation.navigate("Notification")}>
                    <Notification />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Search />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Top_Header;

const Top_Header_Style = StyleSheet.create({
    container: {
        backgroundColor: "#1B442D",
        height: 63,
        width: "100%",
        paddingHorizontal: SPACING.medium,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    utilities: {
        display: "flex",
        flexDirection: "row",
        gap: 15,
        borderColor: "white",
    },
});
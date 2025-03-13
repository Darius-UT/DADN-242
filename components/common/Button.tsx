import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import React from "react";
import { StyleSheet } from "react-native";
import {
    TouchableOpacity,
    Text,
} from "react-native";




export const SeeAll_Button: React.FC<{ name: string; onPressed: () => void }> = ({ name, onPressed }) => {
    return (
        <TouchableOpacity style={SellAll_Button_Style.expandButton} onPress={onPressed}>
            <Text style={SellAll_Button_Style.buttonText}>{name}</Text>
        </TouchableOpacity>
    );
};

const SellAll_Button_Style = StyleSheet.create({
    expandButton: {
        paddingVertical: 10,
        backgroundColor: COLORS.darkerBackground,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        borderRadius: 8,
    },

    buttonText: {
        // fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.buttonFontSize,
    },
});
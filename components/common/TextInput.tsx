import { COLORS } from "@/constants/Colors";
import { TYPOGRAPHY } from "@/constants/Fonts";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import RNPickerSelect from "react-native-picker-select";

interface TextInputTemplateProps {
    subTitle?: string;
    defaultValue?: string;
    placeHolder?: string;
    placeHolderTextColor?: string;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    secureTextEntry?: boolean;
    isDropDown?: boolean;
    dropdownOptions?: { label: string; value: string }[];
    onFocus?: () => void;
    onChangeText?: (text: string) => void;
    onBlur?: () => void;
}

const TextInputTemplate: React.FC<TextInputTemplateProps> = ({
    subTitle = "Tên textInput",
    defaultValue = "",
    placeHolder = "Nhập vào đây",
    placeHolderTextColor = COLORS.Gray,
    keyboardType = "default",
    secureTextEntry = false,
    isDropDown = false,
    dropdownOptions = [],
    onFocus = () => { },
    onChangeText = () => { },
    onBlur = () => { },
}) => {

    const [] = useFonts({
        "Roboto-ExtraBold": require("@/assets/fonts/Roboto/static/Roboto-ExtraBold.ttf"),
        "Roboto-SemiBold": require("@/assets/fonts/Roboto/static/Roboto-SemiBold.ttf"),
    });

    const [selectedValue, setSelectedValue] = useState(defaultValue);

    return (
        <View style={TextInputTemplate_Style.overallContainer}>
            <View style={TextInputTemplate_Style.subTitleContainer}>
                <Text style={TextInputTemplate_Style.subTitleText}>{subTitle}</Text>
            </View>
            {isDropDown ? (
                <SelectList
                    setSelected={setSelectedValue}
                    data={dropdownOptions}
                    placeholder={placeHolder}
                    boxStyles={TextInputTemplate_Style.selectBox}
                    inputStyles={TextInputTemplate_Style.selectInput}
                    dropdownStyles={TextInputTemplate_Style.selectDropdownBox}
                />
            ) : (
                <TextInput style={TextInputTemplate_Style.textInputContainer}
                    defaultValue={defaultValue}
                    cursorColor={COLORS.primary}
                    numberOfLines={1}
                    placeholder={placeHolder}
                    placeholderTextColor={placeHolderTextColor}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    onFocus={onFocus}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                />
            )}

        </View>
    );
};

export default TextInputTemplate;



const TextInputTemplate_Style = StyleSheet.create({
    overallContainer: {
        flexDirection: "column",
        rowGap: 8,
    },

    subTitleContainer: {

    },

    subTitleText: {
        fontFamily: "Roboto-SemiBold",
        fontSize: TYPOGRAPHY.subTitleFontSize - 4,
        color: COLORS.textPrimary,
    },

    textInputContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.primary,
        paddingHorizontal: 20,
    },

    selectBox: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 5,
    },

    selectInput: {
        color: COLORS.Gray,
    },

    selectDropdownBox: {
        position: "absolute",
        top: "100%",
        width: "100%",
        backgroundColor: COLORS.background,
        elevation: 5,
        borderRadius: 5,
        zIndex: 100,
    }
});
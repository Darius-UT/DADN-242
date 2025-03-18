import { COLORS } from "@/constants/Colors";
import React from "react";
import { TextInput, View, Text } from "react-native";

interface TextInputTemplateProps {
    subTitle?: string,
    defaultValue?: string,
    placeHolder?: string,
    placeHolderTextColor?: string,
}

const TextInputTemplate: React.FC<TextInputTemplateProps> = ({
    subTitle = "Tên textInput",
    defaultValue = "Giá trị mặc định",
    placeHolder = "Nhập vào đây",
    placeHolderTextColor = COLORS.black,
}) => {
    return (
        <View>
            <View>
                <Text>{subTitle}</Text>
            </View>
            <TextInput
                defaultValue={defaultValue}
                cursorColor={COLORS.primary}
                numberOfLines={1}
                placeholder={placeHolder}
                placeholderTextColor={placeHolderTextColor}
            />
        </View>
    );
};

export default TextInputTemplate;

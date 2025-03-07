import { StyleSheet } from "react-native";
import { Image, View, Text } from "react-native";
import { useFonts } from "expo-font";
import { TYPOGRAPHY } from "@/constants/Fonts";


// Main structure
const Small_Logo = () => {
    const [] = useFonts({
        "TheNautigal-Bold": require("@/assets/fonts/The_Nautigal/TheNautigal-Bold.ttf"),
    });

    return (
        <View style={Small_Logo_Style.container}>
            <Image source={require('@/assets/images/Logo.png')} style={Small_Logo_Style.myLogo} />
            <Text style={Small_Logo_Style.myLogoText}>Bontanica</Text>
        </View>
    );
};
export default Small_Logo;


// Effects
const Small_Logo_Style = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    myLogo: {
        width: 45,
        height: 45,
    },

    myLogoText: {
        color: "white",
        fontFamily: "TheNautigal-Bold",
        fontSize: TYPOGRAPHY.smallLogoFontSize,
    }
});


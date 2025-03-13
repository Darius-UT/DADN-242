import { COLORS } from "@/constants/Colors";
import React from "react";
import { Searchbar } from 'react-native-paper';


export const SearchBar = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <Searchbar
            placeholder="Tìm kiếm tên cảm biến"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{
                backgroundColor: COLORS.darkerBackground,
            }}
            inputStyle={{
                color: COLORS.black,
            }}
        />
    )
}
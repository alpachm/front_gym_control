import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import IconDownArrow from "../../icons/IconDownArrow";
import { ThemeContext } from "../../context/themeContext";
import SelectEntity from "../../entities/select.entity";
import useGlobalStyles from "../../styles/useGlobalStyles";

interface Props {
    placeholder: string;
    data: SelectEntity[];
}

const GenericSelect = (props: Props) => {
    const { theme } = useContext(ThemeContext);
    const { input } = useGlobalStyles();

    return (
        <SelectDropdown
            data={props.data}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
            }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View
                        style={{
                            ...styles.unitsContainer,
                            ...input,
                            borderColor: theme.text_color,
                            backgroundColor: theme.bg_modal,
                        }}
                    >
                        <Text
                            style={{
                                color: theme.text_color,
                            }}
                        >
                            {(selectedItem && selectedItem.title) ||
                                props.placeholder}
                        </Text>
                        <IconDownArrow
                            width={11}
                            height={11}
                            fill={theme.text_color}
                        />
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View
                        style={{
                            ...styles.dropdownItemStyle,
                            ...(isSelected && {
                                backgroundColor: theme.primary,
                            }),
                            backgroundColor: theme.bg_modal,
                        }}
                    >
                        <Text
                            style={{
                                ...styles.dropdownItemTxtStyle,
                                color: theme.text_color,
                            }}
                        >
                            {item.title}
                        </Text>
                    </View>
                );
            }}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default GenericSelect;

const styles = StyleSheet.create({
    unitsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dropdownItemStyle: {
        width: "100%",
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        fontFamily: "Inter_300Light",
        fontSize: 17,
    },
});

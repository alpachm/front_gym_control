import React, { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { ThemeContext } from "../../context/themeContext";
import IconRightArrow from "../../icons/IconRightArrow";
import { toCapitalize } from "../../utils/formatText";
import SelectEntity from "../../entities/select.entity";

interface Props {
    data: SelectEntity[];
    isThemeSelect?: boolean;
}

const ProfileSelect = (props: Props) => {
    const { theme } = useContext(ThemeContext);
    const [isSwithEnable, setIsSwithEnable] = useState(false);

    const toggleSwitch = () =>
        setIsSwithEnable((previousState) => !previousState);

    const renderContent = () => {
        return (
            <>
                <View style={styles.rightContainer}>
                    <Image
                        source={{ uri: props.data[1].icon }}
                        style={styles.image}
                    />
                    <Text style={{ ...styles.text, color: theme.text_color }}>
                        {toCapitalize(props.data[1].title)}
                    </Text>
                </View>
                <IconRightArrow
                    width={20}
                    height={20}
                    fill={theme.text_color}
                />
            </>
        );
    };

    const renderThemeSelect = () => {
        return (
            <>
                <View style={styles.rightContainer}>
                    <Image
                        source={{ uri: props.data[1].icon }}
                        style={styles.image}
                    />
                    <Text style={{ ...styles.text, color: theme.text_color }}>
                        {toCapitalize(props.data[1].title)}
                    </Text>
                </View>
                <Switch
                    trackColor={{
                        false: theme.switch_desactived_color,
                        true: theme.switch_actived_color,
                    }}
                    aria-checked
                    thumbColor={theme.white}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isSwithEnable}
                />
            </>
        );
    };

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    ...styles.input,
                    backgroundColor: theme.bg_modal,
                    opacity: pressed && !props.isThemeSelect ? 0.5 : 1,
                },
            ]}
            onPress={() => {
                if (props.isThemeSelect) {
                    toggleSwitch();
                    return;
                }
            }}
        >
            {props.isThemeSelect ? renderThemeSelect() : renderContent()}
        </Pressable>
    );
};

export default ProfileSelect;

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 70,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rightContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20,
    },
    text: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 18,
    },
    image: {
        width: 50,
        height: 40,
        objectFit: "contain",
    },
});

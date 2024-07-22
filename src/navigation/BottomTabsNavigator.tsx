import {
    BottomTabNavigationEventMap,
    createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import AppStackNavigator from "./AppStackNavigator";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import IconHome from "../icons/IconHome";
import IconUser from "../icons/IconUser";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/themeContext";
import { BottomTabDescriptorMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import {
    TabNavigationState,
    ParamListBase,
    NavigationHelpers,
} from "@react-navigation/native";

export type RootBottomParams = {
    AppStackNavigator: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<RootBottomParams>();

const BottomTabsNavigator = () => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarLabelPosition: "beside-icon",
                tabBarStyle: {
                    backgroundColor: theme.primary,
                    justifyContent: "center",
                },
                tabBarInactiveTintColor: theme.white,
                tabBarActiveTintColor: theme.black,
            }}
            tabBar={(props) => <MyTabBar {...props} />}
        >
            <Tab.Screen
                name="AppStackNavigator"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <IconHome
                            fill={focused ? theme.black : theme.white}
                            width={20}
                            height={20}
                        />
                    ),
                    tabBarLabel: t("TabBar:Home"),
                }}
                component={AppStackNavigator}
            />
            <Tab.Screen
                name="Profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <IconUser
                            fill={focused ? theme.black : theme.white}
                            width={20}
                            height={20}
                        />
                    ),
                    tabBarLabel: t("TabBar:Profile"),
                }}
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
};

export default BottomTabsNavigator;

interface TabBarProps {
    state: TabNavigationState<ParamListBase>;
    descriptors: BottomTabDescriptorMap;
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

function MyTabBar({ state, descriptors, navigation }: TabBarProps) {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={{ ...styles.tabBar, backgroundColor: theme.primary }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel;
                const Icon = options.tabBarIcon;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            ...styles.tabBarButton,
                            borderRightWidth: index === 0 ? 0.3 : 0,
                            borderColor: theme.white,
                        }}
                    >
                        <View
                            style={{
                                ...styles.tabBarButtonInsideContainer,
                                backgroundColor: isFocused
                                    ? theme.white
                                    : "transparent",
                            }}
                        >
                            {Icon &&
                                Icon({
                                    focused: isFocused,
                                    color: isFocused
                                        ? theme.black
                                        : theme.white,
                                    size: 20,
                                })}
                            <Text
                                style={{
                                    fontFamily: isFocused
                                        ? "Inter_600SemiBold"
                                        : "Inter_200ExtraLight",
                                    color: isFocused
                                        ? theme.black
                                        : theme.white,
                                }}
                            >
                                {typeof label === "string" && label}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "red",
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
    },
    tabBarButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tabBarButtonInsideContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        gap: 10,
        paddingVertical: 7,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
});

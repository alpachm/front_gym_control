import React from "react";
import { Pressable, View } from "react-native";
import IconImage from "../../icons/IconImage";
import IconCamera from "../../icons/IconCamera";

const AddImage = () => {
    return (
        <View>
            <Pressable>
                <IconImage />
            </Pressable>
            <Pressable>
                <IconCamera />
            </Pressable>
        </View>
    );
};

export default AddImage;

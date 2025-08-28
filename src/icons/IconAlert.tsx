import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
    <Svg viewBox="0 0 640 640" {...props}>
        <Path d="M352 96c0-17.7-14.3-32-32-32s-32 14.3-32 32v320c0 17.7 14.3 32 32 32s32-14.3 32-32V96zm-32 480c22.1 0 40-17.9 40-40s-17.9-40-40-40-40 17.9-40 40 17.9 40 40 40z" />
    </Svg>
);
export default SvgComponent;

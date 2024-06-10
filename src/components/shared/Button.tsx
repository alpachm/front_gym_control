import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { ThemeContext } from '../../context/themeContext';
import { useTranslation } from 'react-i18next';

interface Props {
  label: string;
  onPres: () => void;
  icon?: (props: SvgProps) => React.JSX.Element;
  width?: number;
  height?: number;
}

const Button = (props: Props) => {
    const {t} = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <Pressable
      onPress={props.onPres}
      style={({pressed}) => [{
        ...styles.button,
        backgroundColor: theme.primary,
        opacity: pressed ? 0.8 : 1,
        width: props.width ?? 250,
        height: props.height ?? 60,
        gap: props.icon ? 35 : 0
      }]}
    >
      <Text style={{...styles.text, color: theme.white}}>{props.label}</Text>
      {props.icon ? <View style={styles.icon}><props.icon width={30} height={30} fill={theme.white} /></View> : null}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    position: "relative"
  },
  icon: { position: "absolute", right: 20},
  text: {
    fontFamily: "Inter_700Bold",
    textTransform: "lowercase",
    fontSize: 20
  }
});
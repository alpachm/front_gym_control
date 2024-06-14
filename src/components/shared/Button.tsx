import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { ThemeContext } from '../../context/themeContext';
import { useTranslation } from 'react-i18next';

interface Props {
  label: string;
  onPress: () => void;
  toLowerCase?: boolean;
  icon?: (props: SvgProps) => React.JSX.Element;
  width?: number;
  height?: number;
}

const Button = (props: Props) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      backgroundColor: theme.primary,
      width: props.width ?? 250,
      height: props.height ?? 60,
      gap: props.icon ? 35 : 0,
    },
    icon: { position: 'absolute', right: 20 },
    text: {
      fontFamily: 'Inter_700Bold',
      fontSize: props.toLowerCase ? 20 : 13,
      textTransform: props.toLowerCase ? "lowercase" : "uppercase",
      color: theme.white
    },
  });

  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        {
          ...styles.button,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text style={styles.text}>{props.label}</Text>
      {props.icon ? (
        <View style={styles.icon}>
          <props.icon width={30} height={30} fill={theme.white} />
        </View>
      ) : null}
    </Pressable>
  );
};

export default Button;

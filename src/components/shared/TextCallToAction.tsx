import React, { useContext } from 'react';
import { Pressable, StyleProp, Text, ViewStyle } from 'react-native';
import useGlobalStyles from '../../styles/useGlobalStyles';
import { ThemeContext } from '../../context/themeContext';

interface Props {
  children: string;
  onPress: () => void;
  textAlign?: 'left' | 'center' | 'right';
  styles?: StyleProp<ViewStyle>;
}

const TextCallToAction = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const globalStyles = useGlobalStyles();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        props.styles
      ]}
      onPress={props.onPress}
    >
      <Text
        style={{
          ...globalStyles.text_callToAction,
          color: theme.white,
          textAlign: props.textAlign ?? 'center',
        }}
      >
        {props.children}
      </Text>
    </Pressable>
  );
};

export default TextCallToAction;

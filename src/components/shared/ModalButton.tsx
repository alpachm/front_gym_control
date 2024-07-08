import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text } from 'react-native';
import { ThemeContext } from '../../context/themeContext';

interface Props {
  label: 'Create' | 'Enter' | 'Cancel';
  onPress: () => void;
}

const ModalButton = (props: Props) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <Pressable
      style={({ pressed }) => [
        {
          ...styles.button,
          backgroundColor: props.label === 'Cancel' ? theme.red : theme.green,
          opacity: pressed ? 0.5 : 1,
        },
      ]}
      onPress={props.onPress}
    >
      <Text style={{ ...styles.text, color: theme.white }}>
        {t(`Modal:${props.label}`)}
      </Text>
    </Pressable>
  );
};

export default ModalButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    height: 40,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Inter_700Bold',
  },
});

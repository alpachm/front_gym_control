import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { IOptionDay } from '../../utils/days';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../context/themeContext';

interface Props {
  day: IOptionDay;
  isActive: boolean;
}

const Day = (props: Props) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
      <Text style={{ ...styles.text, color: props.isActive ? theme.white : theme.primary }}>
        {t(`Days:${props.day.label}`).charAt(0).toUpperCase()}
      </Text>
  );
};

export default Day;

const styles = StyleSheet.create({
    text: {fontSize: 20}
});

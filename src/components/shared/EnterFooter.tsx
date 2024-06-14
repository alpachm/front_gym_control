import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import useGlobalStyles from '../../styles/useGlobalStyles';
import { useTranslation } from 'react-i18next';
import IconGoogle from '../../icons/IconGoogle';
import { ThemeContext } from '../../context/themeContext';

interface Props {
  buttonLabel: string;
  onPress: () => void;
}

const EnterFooter = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const globalStyles = useGlobalStyles();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Button label={props.buttonLabel} onPress={props.onPress} toLowerCase />
      <Text style={globalStyles.text_or}>{t("Actions:Or_Enter")}</Text>
      <Pressable style={({pressed}) => [{ ...styles.button, borderColor: theme.white, opacity: pressed ? 0.5 : 1 }]}>
        <IconGoogle width={23} height={23} />
        <Text style={{...styles.button_text, color: theme.white}}>Google</Text>
      </Pressable>
    </View>
  );
};

export default EnterFooter;

const styles = StyleSheet.create({
  container: { gap: 15, alignItems: 'center' },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: 250,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
  },
  button_text: {
    fontSize: 16,
    fontFamily: "Inter_700Bold"
  }
});

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import useGlobalStyles from '../../styles/useGlobalStyles';
import PrincipalLayout from '../../PrincipalLayout';
import IconDumbbell from '../../icons/IconDumbbell';
import { ThemeContext } from '../../context/themeContext';
import { useContext } from 'react';
import Button from '../../components/shared/Button';
import IconButtonRightArrow from '../../icons/IconButtonRightArrow';
import openUrl from '../../utils/openUrl';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import Title from '../../components/shared/Title';
import TextCallToAction from '../../components/shared/TextCallToAction';

const StartScreen = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { t, i18n } = useTranslation();
  const globalStyles = useGlobalStyles();

  return (
    <PrincipalLayout status="Start">
      <View style={styles.container}>
        <View style={styles.top_view}>
          <IconDumbbell width={44} height={44} fill={theme.white} />
          <Text
            style={{
              ...globalStyles.caption,
              ...styles.caption_1,
            }}
          >
            {t('StartScreen:Caption_1')}
          </Text>
          <Title>{t('StartScreen:Title')}</Title>
          <Text
            style={{
              ...globalStyles.caption,
              ...styles.caption_2,
            }}
          >
            {t('StartScreen:Caption_2')}
          </Text>
        </View>
        <View style={styles.bottom_view}>
          <Button
            label={t('Actions:Login')}
            onPress={() => navigation.navigate('Login')}
            icon={IconButtonRightArrow}
            height={76}
            toLowerCase
          />
          <TextCallToAction
            onPress={() => navigation.navigate('Register')}
            styles={{ marginTop: 25, marginBottom: 57 }}
          >
            {t('StartScreen:Register')}
          </TextCallToAction>
          <Pressable
            onPress={() =>
              openUrl('https://alex-pacheco-portafolio.netlify.app/')
            }
          >
            <Text
              style={{
                ...styles.footer_text,
                color: theme.white,
              }}
            >
              Develop by Alex
            </Text>
          </Pressable>
        </View>
      </View>
    </PrincipalLayout>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  top_view: {
    gap: 15,
  },
  bottom_view: {},
  caption_1: {
    textTransform: 'uppercase',
  },
  caption_2: {
    fontSize: 20,
    letterSpacing: 2,
  },
  footer_text: {
    fontFamily: 'Inter_100Thin',
    fontSize: 11,
    textAlign: 'center',
    opacity: 0.5,
    // marginTop: 57,
  },
});

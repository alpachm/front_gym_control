import React from 'react';
import { StyleSheet, View } from 'react-native';
import PrincipalLayout from '../../PrincipalLayout';
import Title from '../../components/shared/Title';
import { useTranslation } from 'react-i18next';
import PrimaryInput from '../../components/shared/PrimaryInput';
import IconEmail from '../../icons/IconEmail';
import IconKey from '../../icons/IconKey';
import TextCallToAction from '../../components/shared/TextCallToAction';
import EnterFooter from '../../components/shared/EnterFooter';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

const LoginScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const renderInputs = () => {
    return (
      <View style={styles.inputs_view}>
        <PrimaryInput
          placeholder={t('PlaceholderText:Enter_Email')}
          onChenge={(e) => console.log(e)}
          icon={IconEmail}
          inputMode="email"
        />
        <PrimaryInput
          placeholder={t('PlaceholderText:Enter_Password')}
          onChenge={(e) => console.log(e)}
          icon={IconKey}
          inputMode="text"
          secureTextEntry
        />
        <TextCallToAction
          onPress={() => {}}
          textAlign="right"
          styles={{ marginBottom: 45 }}
        >
          {t('LoginScreen:Forgot_Password')}
        </TextCallToAction>
      </View>
    );
  };

  return (
    <PrincipalLayout status="Login" backButton>
      <View style={styles.constainer}>
        <Title>{t('LoginScreen:Title')}</Title>
        <View style={styles.view}>
          {renderInputs()}
          <EnterFooter buttonLabel={t('Actions:Enter')} onPress={() => navigation.navigate("Home")} />
        </View>
      </View>
    </PrincipalLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 90,
  },
  view: {},
  inputs_view: {
    gap: 12,
  },
});

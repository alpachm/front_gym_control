import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrincipalLayout from '../../PrincipalLayout';
import Title from '../../components/shared/Title';
import { useTranslation } from 'react-i18next';
import PrimaryInput from '../../components/shared/PrimaryInput';
import IconUser from '../../icons/IconUser';
import IconEmail from '../../icons/IconEmail';
import IconKey from '../../icons/IconKey';
import EnterFooter from '../../components/shared/EnterFooter';

const RegisterScreen = () => {
  const { t } = useTranslation();

  const renderInputs = () => {
    return (
      <View style={styles.inputs_view}>
        <PrimaryInput
          icon={IconUser}
          placeholder={t('PlaceholderText:Enter_Name')}
          inputMode="text"
          onChenge={(e) => console.log(e)}
        />
        <PrimaryInput
          icon={IconUser}
          placeholder={t('PlaceholderText:Enter_Last_Name')}
          inputMode="text"
          onChenge={(e) => console.log(e)}
        />
        <PrimaryInput
          icon={IconEmail}
          placeholder={t('PlaceholderText:Enter_Email')}
          inputMode="email"
          onChenge={(e) => console.log(e)}
        />
        <PrimaryInput
          icon={IconKey}
          placeholder={t('PlaceholderText:Enter_Password')}
          inputMode="text"
          secureTextEntry
          onChenge={(e) => console.log(e)}
        />
        <PrimaryInput
          icon={IconKey}
          placeholder={t('PlaceholderText:Confirm_Password')}
          inputMode="text"
          secureTextEntry
          onChenge={(e) => console.log(e)}
        />
      </View>
    );
  };

  return (
    <PrincipalLayout status="Register" backButton>
      <View style={styles.container}>
        <Title>{t('RegisterScreen:Title')}</Title>

        <View>
          {renderInputs()}
          <EnterFooter buttonLabel={t("Actions:Register")} onPress={() => {}} />
        </View>
      </View>
    </PrincipalLayout>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  inputs_view: {
    gap: 12,
    marginBottom: 54
  }
});

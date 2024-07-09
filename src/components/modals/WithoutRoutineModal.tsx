import React, { Dispatch, SetStateAction, useContext } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import LayoutModal from './LayoutModal';
import { ThemeContext } from '../../context/themeContext';
import ModalButton from '../shared/ModalButton';
import { useTranslation } from 'react-i18next';

interface Props {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const WithoutRoutineModal = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const renderButtons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <ModalButton
          label="Create"
          onPress={() => {
            props.setIsVisible(false);
          }}
        />
        <ModalButton
          label="Cancel"
          onPress={() => {
            props.setIsVisible(false);
          }}
        />
      </View>
    );
  };

  return (
    <>
      <StatusBar
        backgroundColor={props.isVisible ? theme.backdrop_color : 'transparent'}
      />
      <LayoutModal isVisible={props.isVisible}>
        <View style={{ ...styles.modal, backgroundColor: theme.bg_modal }}>
          <Text style={{ ...styles.text, color: theme.text_color }}>
            {t('Modal:Without_Routine')}
          </Text>
          {renderButtons()}
        </View>
      </LayoutModal>
    </>
  );
};

export default WithoutRoutineModal;

const styles = StyleSheet.create({
  modal: {
    borderRadius: 10,
    backgroundColor: 'red',
    padding: 20,
    gap: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    fontFamily: 'Inter_300Light',
    fontSize: 25,
    textAlign: 'center',
  },
});

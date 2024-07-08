import React, { Dispatch, SetStateAction, useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { ThemeContext } from '../../context/themeContext';
import ModalButton from '../shared/ModalButton';
import { useTranslation } from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown';
import IconDownArrow from '../../icons/IconDownArrow';

interface Props {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const EnterWeightModal = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const data = [{ title: 'kg' }, { title: 'lb' }];

  const renderButtons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <ModalButton
          label="Enter"
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

  const renderInputs = () => {
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            ...styles.input,
            borderColor: theme.text_color,
            color: theme.text_color,
          }}
          placeholder={t('Modal:Enter_Weight')}
          placeholderTextColor={theme.text_color}
          cursorColor={theme.primary}
          selectionColor={theme.primary}
          keyboardType="numeric"
        />
        <SelectDropdown
          data={data}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View
                style={{
                  ...styles.unitsContainer,
                  ...styles.input,
                  borderColor: theme.text_color,
                  width: '30%',
                  borderLeftWidth: 0,
                }}
              >
                <Text style={{ color: theme.text_color }}>
                  {(selectedItem && selectedItem.title) || t('Modal:Unit')}
                </Text>
                <IconDownArrow width={11} height={11} fill={theme.text_color} />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: theme.primary }),
                  backgroundColor: theme.bg_modal,
                }}
              >
                <Text
                  style={{
                    ...styles.dropdownItemTxtStyle,
                    color: theme.text_color,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <ReactNativeModal
      isVisible={props.isVisible}
      backdropColor={theme.black}
      backdropOpacity={0.8}
    >
      <View style={{ ...styles.modal, backgroundColor: theme.bg_table }}>
        {renderInputs()}
        {renderButtons()}
      </View>
    </ReactNativeModal>
  );
};

export default EnterWeightModal;

const styles = StyleSheet.create({
  modal: {
    height: '30%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  container: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  unitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '70%',
    borderWidth: 0.5,
    height: 35,
    paddingHorizontal: 10,
    fontFamily: 'Inter_300Light',
  },
  buttonsContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownItemStyle: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    fontFamily: 'Inter_300Light',
    fontSize: 17,
  },
});
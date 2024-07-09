import React, { ReactNode, useContext } from 'react';
import ReactNativeModal from 'react-native-modal';
import { ThemeContext } from '../../context/themeContext';
import { StatusBar } from 'react-native';

interface Props {
  children: ReactNode;
  isVisible: boolean;
}

const LayoutModal = (props: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <StatusBar
        backgroundColor={props.isVisible ? theme.backdrop_color : 'transparent'}
      />
      <ReactNativeModal
        isVisible={props.isVisible}
        backdropColor={theme.black}
        backdropOpacity={0.8}
      >
        {props.children}
      </ReactNativeModal>
    </>
  );
};

export default LayoutModal;

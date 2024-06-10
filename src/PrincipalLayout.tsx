import React, { useContext } from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import useGlobalStyles from './styles/useGlobalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconLeftArrow from './icons/IconLeftArrow';
import { ThemeContext } from './context/themeContext';
import { useNavigation } from '@react-navigation/native';

interface Props {
  children: React.ReactNode;
  status: 'Start' | 'Login' | 'Register' | 'Home';
  backButton?: boolean;
}

const PrincipalLayout = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const globalStyles = useGlobalStyles();

  const renderBackArrow = () => {
    return (
      <View style={styles.arrow}>
        {props.backButton ? (
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <IconLeftArrow width={40} height={40} fill={theme.white} />
          </Pressable>
        ) : null}
      </View>
    );
  };

  const getImageBackground = (status: string) => {
    switch (status) {
      case 'Start':
        return require('./../assets/bg_start.png');
      case 'Login':
        return require('./../assets/bg_login.png');
      case 'Register':
        return require('./../assets/bg_register.png');
      default:
        return require('./../assets/bg_login.png');
    }
  };

  const renderImageBackground = () => {
    const imagePath = getImageBackground(props.status);
    return (
      <ImageBackground
        style={{ ...styles.imageBackground, paddingTop: top, backgroundColor: theme.black }}
        source={imagePath}
      >
        {renderBackArrow()}
        {props.children}
      </ImageBackground>
    );
  };

  if (
    props.status === 'Start' ||
    props.status === 'Login' ||
    props.status === 'Register'
  ) {
    return renderImageBackground();
  }

  return <View style={globalStyles.layout_container}>{props.children}</View>;
};

export default PrincipalLayout;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  view: {},
  arrow: {
    height: 40,
    marginBottom: 10,
  },
});

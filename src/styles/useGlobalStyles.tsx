import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../context/themeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useGlobalStyles = () => {
  const { theme } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();

  const global_styles = StyleSheet.create({
    layout_container: {
      flex: 1,
      paddingTop: top,
      backgroundColor: theme.bg_color,
    },
    title: {
      maxWidth: '70%',
      fontFamily: 'Inter_900Black',
      fontSize: 30,
      textTransform: 'uppercase',
      color: theme.white,
    },
    caption: {
      fontFamily: 'Inter_100Thin',
      color: theme.white,
    },
    text_callToAction: {
      fontFamily: 'Inter_100Thin',
      fontSize: 16,
      textAlign: 'center',
    },
    text_or: {
        fontFamily: "Inter_100Thin",
        fontSize: 16,
        opacity: 0.7,
        color: theme.white,
        textTransform: "lowercase",
    }
  });

  return global_styles;
};

export default useGlobalStyles;

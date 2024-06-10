import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { ThemeContext } from '../../context/themeContext';

interface Props {
  placeholder: string;
  icon: (props: SvgProps) => React.JSX.Element;
  onChenge: (e: string) => void;
  inputMode: 'text' | 'numeric' | 'email';
  secureTextEntry?: boolean;
}

const PrimaryInput = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ ...styles.view, backgroundColor: theme.bg_primary_input }}>
      <props.icon width={30} height={30} fill={theme.white} opacity={0.2} />
      <TextInput
        style={{...styles.input, color: theme.white, opacity: isFocused ? 1 : 0.5}}
        placeholder={props.placeholder}
        placeholderTextColor={theme.white}
        cursorColor={theme.primary}
        selectionColor={theme.primary}
        onChangeText={props.onChenge}
        inputMode={props.inputMode}
        onFocus={() => setIsFocused(true)}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

export default PrimaryInput;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 20,
    borderRadius: 10,
    width: '100%',
    height: 55,
    opacity: 0.77,
  },
  input: { flex: 1, fontFamily: 'Inter_100Thin', fontSize: 18, opacity: 0.5, textTransform: "lowercase" },
});

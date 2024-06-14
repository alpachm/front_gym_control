import React, { ReactNode, useContext } from 'react'
import { StyleSheet, Text } from 'react-native'
import { ThemeContext } from '../../context/themeContext';

interface Props {
    children: ReactNode;
}

const Subtitle = (props: Props) => {
    const {theme} = useContext(ThemeContext);

  return (
    <Text style={{...styles.subtitle, color: theme.white}}>
        {props.children}
    </Text>
  )
}

export default Subtitle;

const styles = StyleSheet.create({
    subtitle: {
        fontFamily: "Inter_800ExtraBold",
        fontSize: 25,
        textTransform: "uppercase"
    }
})
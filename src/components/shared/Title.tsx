import React, { ReactNode } from 'react'
import { Text } from 'react-native'
import useGlobalStyles from '../../styles/useGlobalStyles';

interface Props {
    children: ReactNode;
}

const Title = (props: Props) => {
    const globalStyles = useGlobalStyles();

  return (
    <Text style={globalStyles.title}>{props.children}</Text>
  )
}

export default Title
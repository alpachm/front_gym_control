import React, { useContext } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ExerciseEntity from '../../entities/exercise.entity';
import { ThemeContext } from '../../context/themeContext';
import { useTranslation } from 'react-i18next';
import IconInfo from '../../icons/IconInfo';
import IconEdit from '../../icons/IconEdit';
import IconCheck from '../../icons/IconCheck';
import { toCapitalize } from '../../utils/formatText';

interface Props {
  exercise: ExerciseEntity;
}

const TableHome = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const renderHeader = () => {
    return (
      <View>
        <Text style={{ ...styles.name, color: theme.primary }}>
          {toCapitalize(props.exercise.name)}
        </Text>
        <Text style={{ ...styles.subtitle, color: theme.text_color }}>
          {t('HomeScreen:Reps')}
        </Text>
        <View style={styles.noRepsContainer}>
          <Text style={styles.noRepsText}>{props.exercise.reps}</Text>
        </View>
      </View>
    );
  };

  const renderMain = () => {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text style={{ ...styles.subtitle, color: theme.text_color }}>
            {t('HomeScreen:Last_Weight')}
          </Text>
          <Text style={{ ...styles.weight, color: theme.text_color }}>
            {props.exercise.last_weight} kg
          </Text>
        </View>
        <View>
          <Text style={{ ...styles.subtitle, color: theme.text_color }}>
            {t('HomeScreen:Current_Weight')}
          </Text>
          <TextInput />
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <Pressable
          style={({ pressed }) => [
            {
              ...styles.buttonIcon,
              backgroundColor: theme.primary,
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          <IconInfo width={10} height={11} fill={theme.white} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              ...styles.buttonIcon,
              backgroundColor: theme.primary,
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          <IconEdit width={10} height={9} fill={theme.white} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              ...styles.buttonIcon,
              backgroundColor: theme.primary,
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          <IconCheck width={10} height={11} fill={theme.white} />
        </Pressable>
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.table,
        backgroundColor: theme.bg_table,
        // INTENTO DE IMPLEMENTAR LOGICA DE COLOR FONDO
        // backgroundColor: finished.includes(props.exercise.id)
        //   ? theme.green
        //   : theme.bg_table,
      }}
    >
      <Image source={{ uri: props.exercise.img_url }} style={styles.image} />
      <View>
        {renderHeader()}
        {renderMain()}
        {renderFooter()}
      </View>
    </View>
  );
};

export default TableHome;

const styles = StyleSheet.create({
  table: {
    width: '100%',
    height: 145,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 7,
  },
  image: {
    width: 165,
    height: 125,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  noRepsContainer: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRepsText: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
    marginTop: 5,
  },
  weight: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

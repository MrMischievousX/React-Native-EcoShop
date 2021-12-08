import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {width} from '../constants/dimension';
import {Colors} from '../constants/colors';
import {Icon, Input} from 'react-native-elements';

interface props {
  iconTitle: string;
  placeholderText: string;
  onChangeText: (value: string) => void;
  secure: boolean;
  value: string;
}

const InputBox: FC<props> = ({
  iconTitle,
  placeholderText,
  onChangeText,
  secure,
  value,
}) => {
  return (
    <View style={styles.container}>
      <Icon
        name={iconTitle}
        type="font-awesome"
        color={Colors.darkText}
        size={20}
        style={styles.icon}
        tvParallaxProperties
      />
      <Input
        autoCompleteType
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={secure}
        placeholder={placeholderText}
        value={value}
        style={styles.input}
        placeholderTextColor={Colors.darkText}
        inputContainerStyle={{borderBottomWidth: 0}}
        containerStyle={{
          alignSelf: 'center',
          height: 40,
        }}
        onChangeText={value => onChangeText(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 44,
    marginHorizontal: width / 16,
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  icon: {
    width: 22,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.3,
    color: Colors.darkText,
  },
});

export default InputBox;

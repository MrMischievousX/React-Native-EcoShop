import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {width} from '../constants/dimension';
interface props {
  title: string;
  onPress: any;
  backgroundColor: string;
  disabled: boolean;
}

const SubmitBtn: FC<props> = ({title, onPress, backgroundColor, disabled}) => {
  return (
    <Button
      title={title}
      disabled={disabled}
      onPress={onPress}
      style={styles.button}
      buttonStyle={[styles.buttonStyle, {backgroundColor: backgroundColor}]}
    />
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 5,
    width: width * 0.9,
  },
  button: {
    width: width * 0.9,
  },
});

export default SubmitBtn;

import React, {FC} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Icon, Divider} from 'react-native-elements';
import {Colors} from '../constants/colors';

interface optionProps {
  iconTitle: string;
  text: string;
  type: string;
  onPress: () => void;
  subText?: boolean;
  last: boolean;
}
const Option: FC<optionProps> = ({
  iconTitle,
  text,
  type,
  onPress,
  subText = false,
  last,
}) => {
  return (
    <>
      <TouchableOpacity style={styles.option} onPress={onPress}>
        <Icon
          name={iconTitle}
          type={type}
          color={Colors.darkpink}
          size={30}
          tvParallaxProperties
        />
        <Text style={styles.optionText}>{text}</Text>
        {subText && <Text style={styles.subText}>English</Text>}
      </TouchableOpacity>
      {last && (
        <Divider
          orientation="horizontal"
          style={styles.divider}
          color={Colors.grey}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 35,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 5,
  },
  divider: {
    marginHorizontal: 30,
    opacity: 0.3,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkText,
  },
  subText: {
    fontSize: 16,
    marginLeft: 140,
    color: Colors.grey,
  },
});
export default Option;

import React, {FC} from 'react';
import {View} from 'react-native';

interface props {
  height?: number;
  width?: number;
}

const Spacer: FC<props> = ({height, width}) => {
  return <View style={{height, width}} />;
};

export default Spacer;

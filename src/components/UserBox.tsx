import React, {FC, useContext} from 'react';
import {View, Text, StyleSheet, Platform, StatusBar} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Colors} from '../constants/colors';
import {AppContext} from '../constants/contextApi';
import {width, height} from '../constants/dimension';

interface props {
  navigation: any;
}

const UserBox: FC<props> = ({navigation}) => {
  const ctx: any = useContext(AppContext);
  return (
    <View style={styles.userContainer}>
      {Platform.OS == 'android' && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <View>
        <Text
          style={styles.userName}>{`Hello ${ctx.currentUser.username}`}</Text>
        <Text style={{color: Colors.darkText}}>
          Find your favourite product
        </Text>
      </View>
      <Avatar
        rounded
        source={{
          uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        }}
        size={50}
        containerStyle={styles.profileImage}
        onPress={() => navigation.navigate('ProfileStack')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
  },
  profileImage: {
    borderWidth: 0.5,
    borderColor: Colors.white,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    paddingBottom: 3,
    color: Colors.darkText,
  },
});

export default UserBox;

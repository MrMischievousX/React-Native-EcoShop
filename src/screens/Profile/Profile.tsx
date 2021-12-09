import React, {FC, useContext} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import {Colors} from '../../constants/colors';
import {profileIcon, height, width} from '../../constants/dimension';
import {Avatar, Icon} from 'react-native-elements';
import {Spacer, Option} from '../../components';
import {options} from '../../constants/dataText';
import {AppContext} from '../../constants/contextApi';
import {RemoveCurrentUser} from '../../constants/localRealm';

interface props {
  navigation: any;
}

const Profile: FC<props> = ({navigation}) => {
  const ctx: any = useContext(AppContext);
  const remove = async () => {
    RemoveCurrentUser();
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.darkpink}}>
      {Platform.OS == 'android' && (
        <StatusBar barStyle="light-content" backgroundColor={Colors.darkpink} />
      )}
      <View
        style={{
          width: height * 0.4,
          height: height * 0.4,
          backgroundColor: Colors.lightpink,
          borderRadius: 200,
          position: 'absolute',
          right: -60,
          top: -140,
          opacity: 0.3,
        }}
      />
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>Profile</Text>
        <View style={styles.profile}>
          <Avatar
            rounded
            source={{
              uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            }}
            size={profileIcon}
            containerStyle={styles.profileImage}
          />
          <View>
            <Text style={styles.name}>{ctx.currentUser.username}</Text>
            <Spacer height={10} />
            <Text style={styles.email}>{ctx.currentUser.email}</Text>
          </View>
          <Icon
            name="pencil"
            type="font-awesome"
            color={Colors.white}
            size={20}
            style={styles.icon}
            tvParallaxProperties
          />
        </View>
      </View>
      <View style={styles.optionContainer}>
        <ScrollView alwaysBounceVertical={false}>
          {options.map((item, index) => {
            return (
              <Option
                key={item.text}
                text={item.text}
                iconTitle={item.iconTitle}
                type={item.type}
                onPress={() => {
                  item.fnc ? remove() : Alert.alert('Work in Progress!!');
                }}
                subText={item.subText ? true : false}
                last={index != options.length - 1}
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    marginHorizontal: width * 0.08,
  },
  profileText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
    marginVertical: 15,
    letterSpacing: 1,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  profileImage: {
    borderWidth: 0.5,
    borderColor: Colors.white,
  },
  icon: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 18,
  },
  email: {
    fontWeight: '600',
    color: Colors.white,
  },
  optionContainer: {
    width: width,
    height: height * 0.65,
    position: 'absolute',
    backgroundColor: Colors.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    bottom: 0,
    justifyContent: 'center',
  },
});

export default Profile;

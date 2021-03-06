import React, {FC, useContext, useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from '../../constants/colors';
import {iconWidth, width} from '../../constants/dimension';
import {Icon} from 'react-native-elements';
import {Spacer, InputBox, SubmitBtn} from '../../components';
import {AppContext} from '../../constants/contextApi';

interface props {
  navigation: any;
}

const App: FC<props> = ({navigation}) => {
  const ctx: any = useContext(AppContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validateUser = async () => {
    const data = await ctx.user.functions.signInUser(
      email.trim(),
      password.trim(),
    );
    console.log(data);
    if (data) {
      await ctx.dispatchEvent('setCurrentUser', data);
      navigation.navigate('HomeTab');
    }
  };

  return (
    <SafeAreaProvider>
      {Platform.OS == 'android' && (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      )}
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
            <View>
              <Spacer height={50} />
              <View style={styles.header}>
                <Text style={styles.headerText}>Sign In</Text>
                <Spacer height={15} />
                <Text style={styles.welcomeText}>
                  Welcome Back! Please Sign In to continue
                </Text>
                <Spacer height={15} />
                <View style={styles.iconContainer}>
                  <Icon
                    name="google"
                    type="font-awesome"
                    color={Colors.googlePlus}
                    size={iconWidth}
                    raised
                    reverse
                    tvParallaxProperties
                    onPress={() => Alert.alert('Work in progress!!')}
                  />
                  <Icon
                    name="twitter"
                    type="font-awesome"
                    color={Colors.twitter}
                    size={iconWidth}
                    raised
                    reverse
                    tvParallaxProperties
                    onPress={() => Alert.alert('Work in progress!!')}
                  />
                  <Icon
                    name="facebook"
                    type="font-awesome"
                    color={Colors.facebook}
                    size={iconWidth}
                    raised
                    reverse
                    tvParallaxProperties
                    onPress={() => Alert.alert('Work in progress!!')}
                  />
                </View>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <InputBox
                iconTitle="user"
                placeholderText="Email"
                secure={false}
                onChangeText={setEmail}
                value={email}
              />
              <InputBox
                iconTitle="lock"
                placeholderText="Password"
                secure={true}
                onChangeText={setPassword}
                value={password}
              />
              <Spacer height={50} />
              <SubmitBtn
                title="Continue"
                disabled={email.length < 8 || password.length < 8}
                onPress={() => validateUser()}
                backgroundColor={Colors.darkpink}
              />
            </View>
            <View style={styles.signInContainer}>
              <Text style={styles.normalText}>{'You are new here?'}</Text>
              <Text
                style={styles.signInText}
                onPress={() => navigation.replace('SignUp')}>
                {' Sign Up'}
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal: width / 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 40,
    fontWeight: '700',
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.grey,
  },
  iconContainer: {
    padding: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  inputContainer: {
    marginVertical: 40,
    alignItems: 'center',
  },
  signInContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  normalText: {
    color: Colors.darkText,
  },
  signInText: {
    color: Colors.darkpink,
    textDecorationLine: 'underline',
  },
});

export default App;

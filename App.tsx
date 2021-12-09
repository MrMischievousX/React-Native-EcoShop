import React, {FC, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {SignIn, SignUp} from './src/screens/Login';
import {Icon} from 'react-native-elements';
import {View, StatusBar} from 'react-native';
import {Colors} from './src/constants/colors';
import {navIconWidth} from './src/constants/dimension';
import {Profile} from './src/screens/Profile';
import {Home, TrendingProducts} from './src/screens/Home';
import {Categories, Category} from './src/screens/Categories';
import {ProductDetail} from './src/components';
import {AppContext} from './src/constants/contextApi';
import {Favourite} from './src/screens/Favourite';
import {Search} from './src/screens/Search';
import Realm from 'realm';
import {adminEmail, adminPassword} from './env';
import {getCurrentUser, addCurrentUser} from './src/constants/localRealm';
const Tab = createBottomTabNavigator();

const TabNavigator: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      detachInactiveScreens={true}
      screenOptions={{
        tabBarActiveTintColor: Colors.darkpink,
        tabBarInactiveTintColor: '#3e2465',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {backgroundColor: '#f1f6f9'},
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) => (
            <Icon
              tvParallaxProperties
              name={focused ? 'home' : 'home-outline'}
              type="ionicon"
              color={color}
              size={navIconWidth}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, focused}) => (
            <Icon
              tvParallaxProperties
              name={focused ? 'search' : 'search'}
              type="ionicon"
              color={color}
              size={navIconWidth}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FavouriteStack"
        component={Favourite}
        options={{
          tabBarLabel: 'Favourite',
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                bottom: 20,
                height: 58,
                width: 58,
                borderRadius: 58,
                backgroundColor: Colors.darkpink,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                tvParallaxProperties
                name={focused ? 'heart' : 'heart-o'}
                type="font-awesome"
                color={Colors.white}
                size={navIconWidth}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="CategoriesStack"
        component={CategoryStackNavigator}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({color, focused}) => (
            <Icon
              tvParallaxProperties
              name={focused ? 'border-all' : 'border-all'}
              type="material-community"
              color={color}
              size={navIconWidth}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, focused}) => (
            <Icon
              tvParallaxProperties
              name={focused ? 'user' : 'user-o'}
              type="font-awesome"
              color={color}
              size={navIconWidth}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const LoginStack = createStackNavigator();
const LoginStackNavigator = () => {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LoginStack.Screen name="SignIn" component={SignIn} />
      <LoginStack.Screen name="SignUp" component={SignUp} />
    </LoginStack.Navigator>
  );
};

const HomeStack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Trending" component={TrendingProducts} />
      <HomeStack.Screen name="CategoryItem" component={Category} />
    </HomeStack.Navigator>
  );
};

const CategoryStack = createStackNavigator();
const CategoryStackNavigator = () => {
  return (
    <CategoryStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <CategoryStack.Screen name="Category" component={Categories} />
      <CategoryStack.Screen name="CategoryItem" component={Category} />
    </CategoryStack.Navigator>
  );
};

const MainStack = createStackNavigator();
const MainStackNavigator = () => {
  const [user, setUser] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [load, setLoad] = useState<boolean>(false);

  const dispatchEvent = (action: string, payload: any) => {
    switch (action) {
      case 'setCurrentUser':
        setCurrentUser(payload);
        if (!currentUser) addCurrentUser(payload);
        return;
      default:
        console.log('Default');
    }
  };

  const getUser = async () => {
    const app = new Realm.App({id: 'ecoshop-nzbjz'});
    const credentials = Realm.Credentials.emailPassword(
      adminEmail,
      adminPassword,
    );
    try {
      const user = await app.logIn(credentials);
      setUser(user);
    } catch (err) {
      console.error('Failed to log in', err);
      setUser(null);
    }
  };

  const getCurr = async () => {
    const curr: any = await getCurrentUser();
    if (curr.length >= 1) {
      const data = await user.functions.signInUser(
        curr[0].email,
        curr[0].password,
      );
      setCurrentUser(data);
      setLoad(true);
    } else setLoad(true);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getCurr();
    }
  }, [user]);

  if (!load) return null;

  return (
    <AppContext.Provider value={{user, currentUser, dispatchEvent}}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <MainStack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={currentUser ? 'HomeTab' : 'Login'}>
          <MainStack.Screen name="Login" component={LoginStackNavigator} />
          <MainStack.Screen name="HomeTab" component={TabNavigator} />
          <MainStack.Screen name="ProductDetail" component={ProductDetail} />
        </MainStack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default MainStackNavigator;

// defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
// defaults write com.apple.finder AppleShowAllFiles 1 && killall Finder

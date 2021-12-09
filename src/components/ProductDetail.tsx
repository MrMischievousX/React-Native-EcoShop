import React, {FC, Fragment, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import {Colors} from '../constants/colors';
import {Avatar, Icon} from 'react-native-elements';
import {height, width} from '../constants/dimension';
import {Spacer} from '.';
import {AppContext} from '../constants/contextApi';

interface props {
  route: any;
  navigation: any;
}

const ProductDetail: FC<props> = ({navigation, route}) => {
  const {item} = route.params;
  const ctx: any = useContext(AppContext);

  const isFav = ctx.currentUser.favourite.find((e: string) => e == item._id);

  const Fav = async () => {
    await ctx.user.functions.addFavourite(
      ctx.currentUser._id.toString(),
      item._id.toString(),
      isFav,
    );
    const data = await ctx.user.functions.signInUser(
      ctx.currentUser.email,
      ctx.currentUser.password,
    );
    if (data) {
      await ctx.dispatchEvent('setCurrentUser', data);
    }
  };

  const arr = new Array();
  const rate = item.retail_price % 5;
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.ceil(rate)) arr.push(1);
    else arr.push(0);
  }

  return (
    <Fragment>
      {Platform.OS == 'android' ? (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      ) : (
        <View style={{height: width * 0.06, backgroundColor: 'white'}} />
      )}
      <View style={{backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: width,
            paddingHorizontal: width * 0.05,
            height: height * 0.08,
          }}>
          <Icon
            name="ios-chevron-back"
            type="ionicon"
            color={Colors.darkpink}
            size={36}
            iconStyle={{
              color: Colors.darkpink,
            }}
            tvParallaxProperties
            onPress={() => navigation.goBack()}
          />
          <Avatar
            rounded
            source={{
              uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
            }}
            size={50}
            containerStyle={styles.profileImage}
            onPress={() => console.log('Pressed')}
          />
        </View>
      </View>
      <ScrollView
        bounces={false}
        style={{
          backgroundColor: Colors.white,
        }}>
        <View
          style={{
            marginHorizontal: width * 0.05,
            borderWidth: 2,
            borderRadius: width * 0.05,
            borderColor: Colors.darkpink,
            marginTop: width * 0.01,
            justifyContent: 'center',
            alignItems: 'center',
            padding: width * 0.05,
            overflow: 'hidden',
          }}>
          <ImageBackground
            source={{
              uri: item.image[0],
            }}
            resizeMode="contain"
            style={{
              overflow: 'hidden',
              width: width * 0.84,
              height: height * 0.46,
              alignSelf: 'center',
            }}>
            <Icon
              name={isFav ? 'heart' : 'heart-o'}
              type="font-awesome"
              color={Colors.darkpink}
              size={30}
              style={{marginLeft: '80%'}}
              tvParallaxProperties
              onPress={Fav}
            />
          </ImageBackground>
        </View>

        <View style={{marginHorizontal: width * 0.05}}>
          <Text style={styles.title}>{item.product_name}</Text>
          <View style={styles.rating}>
            {arr.map((item, index) => {
              return (
                <Icon
                  key={index}
                  name={item == 1 ? 'star' : 'star-outline'}
                  type="ionicon"
                  color={Colors.darkpink}
                  size={20}
                  style={{marginLeft: 1}}
                  tvParallaxProperties
                />
              );
            })}
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.price}>{`Rs : ${item.retail_price}`}</Text>
            <Text
              style={
                styles.discountPrice
              }>{`Rs : ${item.discounted_price}`}</Text>
          </View>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Spacer height={height * 0.1} />
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          bottom: 0,
          height: height * 0.1,
          justifyContent: 'space-between',
          width: width,
          alignItems: 'center',
          paddingHorizontal: width * 0.05,
          backgroundColor: Colors.white,
        }}>
        <TouchableOpacity
          style={{
            width: width * 0.4,
            backgroundColor: Colors.darkpink,
            height: height * 0.05,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Text style={{fontSize: 16, fontWeight: '600', color: Colors.white}}>
            Add to Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: width * 0.4,
            backgroundColor: Colors.white,
            borderWidth: 2,
            borderColor: Colors.black,
            height: height * 0.05,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Text style={{fontSize: 16, fontWeight: '600', color: Colors.black}}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  profileImage: {
    borderWidth: 0.5,
    borderColor: Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: height * 0.02,
    color: Colors.darkText,
  },
  price: {
    fontSize: 18,
    marginTop: height * 0.005,
    fontWeight: '600',
    textDecorationLine: 'line-through',
    textDecorationColor: Colors.darkpink,
    textDecorationStyle: 'solid',
    color: Colors.darkText,
  },
  discountPrice: {
    fontSize: 18,
    marginTop: height * 0.005,
    fontWeight: '600',
    marginHorizontal: 5,
    color: Colors.darkText,
  },
  review: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.darkText,
    fontWeight: '500',
  },
  description: {
    marginTop: 10,
    letterSpacing: 0.5,
    fontSize: 15,
    color: Colors.darkText,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: height * 0.005,
  },
});

export default ProductDetail;

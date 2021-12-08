import React, {FC, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from '../constants/colors';
import Spacer from './Spacer';
import {height, width} from '../constants/dimension';
import {AppContext} from '../constants/contextApi';

interface props {
  item: any;
  navigation: any;
}

const ProductBox: FC<props> = ({item, navigation}) => {
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

  return (
    <View style={styles.productContainer}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate('ProductDetail', {
            item: item,
          })
        }>
        <ImageBackground
          source={{uri: item.image[0]}}
          style={styles.productImage}
          resizeMode="contain">
          <Icon
            name={isFav ? 'heart' : 'heart-o'}
            type="font-awesome"
            color={Colors.darkpink}
            size={26}
            containerStyle={{top: 0, marginLeft: 100}}
            tvParallaxProperties
            onPress={Fav}
          />
          <View
            style={{
              backgroundColor: Colors.white,
              bottom: 0,
              position: 'absolute',
              width: '100%',
              padding: 5,
              justifyContent: 'space-between',
            }}>
            <Text numberOfLines={2} style={styles.productTitle}>
              {item.product_name}
            </Text>
            <Spacer height={5} />
            <View style={{flexDirection: 'row'}}>
              <Text
                style={styles.productPrice}>{`Rs ${item.retail_price}`}</Text>
              <Text
                style={
                  styles.discountedPrice
                }>{`Rs ${item.discounted_price}`}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    width: width * 0.43,
    height: height * 0.3,
    marginVertical: height * 0.01,
    borderWidth: 0.2,
    borderRadius: width * 0.02,
    borderColor: Colors.grey,
    padding: width * 0.02,
    backgroundColor: Colors.white,
    shadowColor: Colors.grey,
    shadowOffset: {
      width: -3,
      height: 4,
    },
    shadowRadius: 3,
    shadowOpacity: 0.6,
    elevation: 10,
  },
  discountedPrice: {
    marginHorizontal: 5,
    color: Colors.darkText,
  },
  productImage: {
    width: '100%',
    position: 'relative',
    height: '100%',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.darkText,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'line-through',
    textDecorationColor: Colors.darkpink,
    color: Colors.darkText,
  },
});

export default ProductBox;

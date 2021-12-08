import React, {FC, useContext, useEffect, useState} from 'react';
import {Text, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {ProductBox, UserBox} from '../../components';
import {height, width} from '../../constants/dimension';
import {Colors} from '../../constants/colors';
import {AppContext} from '../../constants/contextApi';
import {Icon} from 'react-native-elements';

interface props {
  navigation: any;
}

const Favourite: FC<props> = ({navigation}) => {
  const ctx: any = useContext(AppContext);
  const [favourite, setFavourite] = useState<any>([]);

  const getFavourites = async () => {
    if (ctx.currentUser.favourite.length >= 1) {
      const p = ctx.currentUser.favourite.map((item: string) => {
        return ctx.user.functions.getOneProduct(item);
      });
      Promise.all(p).then(values => {
        setFavourite(values);
      });
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <UserBox navigation={navigation} />
        <View style={styles.productsContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.categoryText}>Your Favourites</Text>
            <Icon
              name={'refresh'}
              type="font-awesome"
              color={Colors.darkpink}
              size={26}
              containerStyle={{top: 0, marginLeft: 100}}
              tvParallaxProperties
              onPress={getFavourites}
            />
          </View>
          {favourite.length >= 1 &&
            favourite.map((item: any, index: number) => {
              return (
                item && (
                  <ProductBox
                    item={item}
                    key={item._id}
                    navigation={navigation}
                  />
                )
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  categoryText: {
    fontSize: 28,
    fontWeight: '600',
    marginVertical: height * 0.02,
  },
  itemText: {
    textTransform: 'capitalize',
  },
  productsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.01,
  },
  icon: {
    width: 40,
    height: 40,
    borderColor: Colors.darkpink,
  },
});

export default Favourite;

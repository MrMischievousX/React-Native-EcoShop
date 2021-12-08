import React, {FC, useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import {Colors} from '../../constants/colors';
import {width, height} from '../../constants/dimension';
import {ProductBox, UserBox} from '../../components';
import {AppContext} from '../../constants/contextApi';

interface props {
  navigation: any;
}

const TrendingProducts: FC<props> = ({navigation}) => {
  const [products, setProducts] = useState<any | null>(null);
  const [pgNo, setPgNo] = useState<number>(1);
  const ctx: any = useContext(AppContext);

  const getProducts = async () => {
    const data = await ctx.user.functions.getAllProducts(pgNo);
    if (products) setProducts([...products, ...data.data]);
    else setProducts(data.data);
    setPgNo(data.pgNo);
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (!products) return null;

  return (
    <SafeAreaView style={styles.main}>
      <UserBox navigation={navigation} />
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (pgNo < 50) getProducts();
        }}
        onEndReachedThreshold={0.7}
        ListFooterComponent={() => {
          return (
            pgNo < 50 && (
              <ActivityIndicator
                style={{marginTop: height * 0.01}}
                size="large"
                color={Colors.darkpink}
              />
            )
          );
        }}
        data={products}
        columnWrapperStyle={{justifyContent: 'space-evenly'}}
        numColumns={2}
        renderItem={({item, index}: {item: any; index: number}) => {
          return (
            <ProductBox item={item} key={item._id} navigation={navigation} />
          );
        }}
        keyExtractor={(item: any, index: number) => item._id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  categories: {
    marginHorizontal: width * 0.05,
    marginTop: height * 0.02,
  },
  categoriesText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.darkText,
  },
  categoriesAllText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.darkpink,
    opacity: 0.6,
    textAlign: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginVertical: height * 0.015,
    justifyContent: 'space-around',
  },
  category: {
    width: '23%',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 14,
    textTransform: 'capitalize',
    textAlign: 'center',
    marginTop: width * 0.01,
    color: Colors.darkText,
  },
  icon: {
    width: 50,
    height: 50,
    borderColor: Colors.darkpink,
  },
  trending: {marginHorizontal: width * 0.05},
  trendingText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.darkText,
  },
  trendingAllText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.darkpink,
    opacity: 0.6,
    textAlign: 'center',
  },
  productsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginVertical: height * 0.01,
  },
});

export default TrendingProducts;

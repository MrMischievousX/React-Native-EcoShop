import React, {FC, useContext, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from '../../constants/colors';
import {width, height} from '../../constants/dimension';
import {ProductBox, UserBox} from '../../components';
import {AppContext} from '../../constants/contextApi';
import {categories} from '../../constants/dataText';

interface props {
  navigation: any;
}

const Home: FC<props> = ({navigation}) => {
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
          if (pgNo < 10) getProducts();
        }}
        onEndReachedThreshold={0.7}
        ListFooterComponent={
          <ActivityIndicator size="large" color={Colors.darkpink} />
        }
        ListHeaderComponent={
          <View style={styles.categories}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <Text style={styles.categoriesText}>Categories</Text>
              <Text
                style={styles.categoriesAllText}
                onPress={() => navigation.navigate('CategoriesStack')}>
                View All Categories
              </Text>
            </View>
            <View style={styles.categoriesContainer}>
              {categories &&
                categories.slice(0, 4).map((item, index) => {
                  return (
                    <View key={index} style={styles.category}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                          navigation.navigate('CategoryItem', {category: item})
                        }>
                        <Icon
                          reverse
                          name={item.icon}
                          type={item.type}
                          color={Colors.darkpink}
                          size={28}
                          style={styles.icon}
                          tvParallaxProperties
                        />
                        <Text numberOfLines={2} style={styles.categoryText}>
                          {item.text}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginVertical: height * 0.02,
              }}>
              <Text style={styles.trendingText}>Trending Products</Text>
              <Text
                style={styles.trendingAllText}
                onPress={() => navigation.navigate('Trending')}>
                View All Products
              </Text>
            </View>
          </View>
        }
        data={products}
        columnWrapperStyle={{justifyContent: 'space-evenly'}}
        numColumns={2}
        renderItem={({item, index}: {item: any; index: number}) => {
          return (
            <ProductBox item={item} key={item._id} navigation={navigation} />
          );
        }}
        keyExtractor={(item: any, index) => item._id}
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
    textAlign: 'center',
  },
  productsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginVertical: height * 0.01,
  },
});

export default Home;

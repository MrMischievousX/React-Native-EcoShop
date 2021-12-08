import React, {FC, useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {ProductBox, UserBox} from '../../components';
import {height, width} from '../../constants/dimension';
import {Colors} from '../../constants/colors';
import {AppContext} from '../../constants/contextApi';
import {SearchBar} from 'react-native-elements';

interface props {
  navigation: any;
}

const Search: FC<props> = ({navigation}) => {
  const ctx: any = useContext(AppContext);
  const [searchTxt, setSearchTxt] = useState<string>('');
  const [searchProducts, setSearchProducts] = useState<any>(null);
  const [pgNo, setPgNo] = useState<number>(1);

  const searchForProduct = async () => {
    const data = await ctx.user.functions.getProductsWithQuery(searchTxt, pgNo);
    if (searchProducts) setSearchProducts([...searchProducts, ...data.data]);
    setSearchProducts(data.data);
    setPgNo(data.pgNo);
  };

  const reset = () => {
    setPgNo(1);
    setSearchProducts(null);
  };

  useEffect(() => {
    searchForProduct();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <UserBox navigation={navigation} />
      <SearchBar
        placeholder="Search Your Product"
        onChangeText={setSearchTxt}
        onFocus={reset}
        onClear={reset}
        value={searchTxt}
        containerStyle={{
          backgroundColor: 'white',
          borderWidth: 0.1,
          borderColor: 'white',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          marginHorizontal: width * 0.03,
        }}
        onSubmitEditing={searchForProduct}
        inputContainerStyle={{backgroundColor: '#f5f5f5'}}
        showCancel
      />
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (pgNo < 50) searchForProduct();
        }}
        onEndReachedThreshold={0.7}
        ListFooterComponent={() =>
          pgNo < 50 && (
            <ActivityIndicator
              size="large"
              style={{marginTop: height * 0.01}}
              color={Colors.darkpink}
            />
          )
        }
        data={searchProducts}
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

export default Search;

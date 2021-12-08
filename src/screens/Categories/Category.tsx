import React, {FC, useState, useEffect, Fragment, useContext} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {ProductBox} from '../../components';
import {height, width} from '../../constants/dimension';
import {Colors} from '../../constants/colors';
import {Icon, Avatar, Text} from 'react-native-elements';
import {AppContext} from '../../constants/contextApi';

interface props {
  navigation: any;
  route: any;
}

const Category: FC<props> = ({navigation, route}) => {
  const {category} = route.params;
  const [categoryData, setcategoryData] = useState<any[] | null>(null);
  const [pgNo, setPgNo] = useState<number>(1);
  const ctx: any = useContext(AppContext);

  const getCategoryData = async () => {
    const data = await ctx.user.functions.getProductsWithCategory(
      category.text,
      pgNo,
    );
    if (categoryData) setcategoryData([...categoryData, ...data.data]);
    else setcategoryData(data.data);
    setPgNo(data.pgNo);
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <Fragment>
      {Platform.OS == 'android' ? (
        <StatusBar barStyle="dark-content" backgroundColor="white" />
      ) : (
        <View style={{height: width * 0.1, backgroundColor: 'white'}} />
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
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
            <Text style={{fontSize: 18, fontWeight: '500', color: Colors.grey}}>
              {category.text}
            </Text>
          </View>
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

      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (pgNo < 50) getCategoryData();
        }}
        onEndReachedThreshold={0.7}
        ListFooterComponent={() => {
          return (
            pgNo < 50 && (
              <ActivityIndicator
                size="large"
                style={{marginTop: height * 0.01}}
                color={Colors.darkpink}
              />
            )
          );
        }}
        data={categoryData}
        columnWrapperStyle={{justifyContent: 'space-evenly'}}
        numColumns={2}
        renderItem={({item, index}: {item: any; index: number}) => {
          return (
            <ProductBox item={item} key={item._id} navigation={navigation} />
          );
        }}
        keyExtractor={(item: any, index: number) => item._id}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  productsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.05,
  },
  profileImage: {
    borderWidth: 0.5,
    borderColor: Colors.white,
  },
});

export default Category;

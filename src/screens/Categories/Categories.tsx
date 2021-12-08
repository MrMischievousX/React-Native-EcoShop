import React, {FC} from 'react';
import {Text, SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import {UserBox} from '../../components';
import {height, width} from '../../constants/dimension';
import {ListItem, Icon} from 'react-native-elements';
import {Colors} from '../../constants/colors';
import {categories} from '../../constants/dataText';
interface props {
  navigation: any;
}

const Categories: FC<props> = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <UserBox navigation={navigation} />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.categoryText}>All Categories</Text>
          {categories &&
            categories.map((item, index) => {
              return (
                <ListItem
                  hasTVPreferredFocus
                  tvParallaxProperties
                  key={index}
                  onPress={() =>
                    navigation.navigate('CategoryItem', {category: item})
                  }
                  bottomDivider>
                  <Icon
                    reverse
                    name={item.icon}
                    type={item.type}
                    color={Colors.darkpink}
                    size={20}
                    style={styles.icon}
                    tvParallaxProperties
                  />
                  <ListItem.Content>
                    <ListItem.Title style={styles.itemText}>
                      {item.text}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron size={28} tvParallaxProperties />
                </ListItem>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  categoryText: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: height * 0.03,
    marginBottom: height * 0.01,
    marginHorizontal: width * 0.05,
    color: Colors.darkText,
  },
  itemText: {
    textTransform: 'capitalize',
  },
  icon: {
    width: 40,
    height: 40,
    borderColor: Colors.darkpink,
  },
});

export default Categories;

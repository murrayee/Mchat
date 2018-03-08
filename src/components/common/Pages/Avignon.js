import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, Dimensions, FlatList } from 'react-native';

import { Header } from 'react-navigation';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';

const MIN_HEIGHT = Header.HEIGHT;
const MAX_HEIGHT = 200;

const data = [
  { id: 1, text: 'Palais des Papes' },
  { id: 2, text: 'Pont St Bénézet' },
  { id: 3, text: 'Île de la Batelasse' },
  { id: 4, text: 'Petit Palais' },
  { id: 5, text: 'Rochet des Doms' },
  { id: 6, text: 'Rue des Teinturiers' },
];

class BasicUsage extends React.Component {
  _keyExtractor = item => item.id;
  _renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );
  render() {
    return (
      <View style={styles.container}>
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          minOverlayOpacity={0.4}
          renderHeader={() => <Image source={require('../../assets/avignon.jpg')} style={styles.image} />}
          ScrollViewComponent={FlatList}
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
  },
  item: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'blue',
    margin: 10,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  itemText: {
    fontSize: 20,
  },
});

BasicUsage.route = {
  navigationBar: {
    tintColor: 'white',
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    statusBarHeight: 0,
    elevation: 0,
  },
};

export default BasicUsage;

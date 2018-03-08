import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

import HeaderImageScrollView from 'react-native-image-header-scroll-view';

class ColorsPage extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderImageScrollView
          maxHeight={300}
          minHeight={80}
          fadeOutForeground
          headerImage={require('../../assets/cutecat.jpg')}
          overScrollMode="never"
          overlayColor="#4A148C"
          maxOverlayOpacity={0.9}
          renderForeground={() => (
            <View style={styles.titleContainer}>
              <Text style={styles.imageTitle}>Cat</Text>
            </View>
          )}
          foregroundParallaxRatio={3}
        >
          <View style={{ height: 100, backgroundColor: '#4CAF50' }} />
          <View style={{ height: 100, backgroundColor: '#F44336' }} />
          <View style={{ height: 100, backgroundColor: '#009688' }} />
          <View style={{ height: 100, backgroundColor: '#03A9F4' }} />
          <View style={{ height: 100, backgroundColor: '#FF9800' }} />
          <View style={{ height: 100, backgroundColor: '#673AB7' }} />
          <View style={{ height: 100, backgroundColor: '#795548' }} />
          <View style={{ height: 100, backgroundColor: '#FFEB3B' }} />
        </HeaderImageScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
});

export default ColorsPage;

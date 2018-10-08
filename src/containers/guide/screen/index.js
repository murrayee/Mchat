import React, { PureComponent } from 'react';
import { Image, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { Carousel } from 'antd-mobile-rn';
import { styles } from '../style';

export default class BasicCarouselExample extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0,
    };
  }

  enterApp = () => {
    const { navigation: { state }, navigation } = this.props;
    AsyncStorage.setItem('murray/version', JSON.stringify(state.params.version));
    navigation.navigate('authLoading');
  };

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          afterChange={(current) => this.setState({ current })}
          dots={this.state.current !== 3}
          style={styles.wrapper}
          bounces={false}
          dotStyle={styles.dot}
          dotActiveStyle={styles.dotActive}
        >
          <View style={styles.containerHorizontal}>
            <Image style={styles.imageGuide}
                   source={require('../../../assets/guide/1.png')}/>
          </View>
          <View style={styles.containerHorizontal}>
            <Image style={styles.imageGuide}
                   source={require('../../../assets/guide/2.png')}/>

          </View>
          <View style={styles.containerHorizontal}>
            <Image style={styles.imageGuide}
                   source={require('../../../assets/guide/3.png')}/>

          </View>
          <View style={styles.containerHorizontal}>
            <Image style={styles.imageGuide}
                   source={require('../../../assets/guide/4.png')}/>
            <View style={styles.desWrapper}>
              <TouchableOpacity style={styles.btn}
                                onPress={() => this.enterApp()}>
                <Text style={styles.btnText}>Enter</Text>
              </TouchableOpacity>
            </View>
          </View>

        </Carousel>
      </View>
    );
  }
}

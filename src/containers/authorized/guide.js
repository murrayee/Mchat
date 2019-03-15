import React, { PureComponent } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Carousel } from "@ant-design/react-native";
import { guideStyles } from "@styles";

import { Storage } from '@utils';

export default class Guide extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0
    };
  }

  enterApp = () => {
    const {
      navigation: { state },
      navigation
    } = this.props;
    Storage.set(
      "murray/version",
      state.params.version
    );
    navigation.navigate("loading");
  };

  render() {
    return (
      <View style={guideStyles.container}>
        <Carousel
          afterChange={current => this.setState({ current })}
          dots={this.state.current !== 3}
          style={guideStyles.wrapper}
          bounces={false}
          dotStyle={guideStyles.dot}
          dotActiveStyle={guideStyles.dotActive}
        >
          <View style={guideStyles.containerHorizontal}>
            <Image
              style={guideStyles.imageGuide}
              source={require("../../assets/guide/1.jpg")}
            />
          </View>
          <View style={guideStyles.containerHorizontal}>
            <Image
              style={guideStyles.imageGuide}
              source={require("@assets/guide/2.png")}
            />
          </View>
          <View style={guideStyles.containerHorizontal}>
            <Image
              style={guideStyles.imageGuide}
              source={require("@assets/guide/3.jpg")}
            />
          </View>
          <View style={guideStyles.containerHorizontal}>
            <Image
              style={guideStyles.imageGuide}
              source={require("@assets/guide/4.jpg")}
            />
            <View style={guideStyles.desWrapper}>
              <TouchableOpacity
                style={guideStyles.btn}
                onPress={() => this.enterApp()}
              >
                <Text style={guideStyles.btnText}>Enter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Carousel>
      </View>
    );
  }
}

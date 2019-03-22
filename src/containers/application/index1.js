import React, { Component } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Carousel from "@components/Carousel";
import { commonStyles, appStyles } from "@styles";
import { WhiteSpace, Grid, Toast } from "@ant-design/react-native";
import BaseLayout from "@components/BaseLayout";

const images = [
  require("../../assets/football/yijia/1.png"),
  require("../../assets/football/yijia/2.png"),
  require("../../assets/football/yijia/3.png"),
  require("../../assets/football/yijia/4.png"),
  require("../../assets/football/yijia/5.png"),
  require("../../assets/football/yijia/6.png"),
  require("../../assets/football/yijia/7.png"),
  require("../../assets/football/yijia/8.png"),
  require("../../assets/football/yijia/9.png"),
  require("../../assets/football/yijia/10.png"),
  require("../../assets/football/yijia/11.png"),
  require("../../assets/football/yijia/12.png"),
  require("../../assets/football/yijia/13.png"),
  require("../../assets/football/yijia/14.png"),
  require("../../assets/football/yijia/15.png"),
  require("../../assets/football/yijia/16.png"),
  require("../../assets/football/yijia/17.png"),
  require("../../assets/football/yijia/18.png"),
  require("../../assets/football/yijia/19.png"),
  require("../../assets/football/yijia/20.png")
];

const data = [
  {
    text: "萨索洛"
  },
  {
    text: "都灵"
  },
  {
    text: "佛罗伦萨"
  },
  {
    text: "卡利亚里"
  },
  {
    text: "亚特兰大"
  },
  {
    text: "恩波利"
  },
  {
    text: "罗马"
  },
  {
    text: "AC米兰"
  },
  {
    text: "尤文图斯"
  },
  {
    text: "桑普多利亚"
  },
  {
    text: "切沃"
  },
  {
    text: "国际米兰"
  },
  {
    text: "拉齐奥"
  },
  {
    text: "乌迪内斯"
  },
  {
    text: "博洛尼亚"
  },
  {
    text: "那不勒斯"
  },

  {
    text: "热那亚"
  },

  {
    text: "斯帕尔"
  },

  {
    text: "弗罗西诺内"
  },

  {
    text: "帕尔马"
  }
];

@connect(state => ({ ...state.application }))
export default class Application extends Component {
  constructor(props, context) {
    super(...arguments);
  }

  static navigationOptions = {
    title: "应用"
  };

  renderItem = (item, index) => {
    const rs = images[index];
    return (
      <TouchableOpacity
        onPress={() => this.onPress(item)}
        style={appStyles.item}
      >
        <Image style={appStyles.icon} source={rs} />
        <Text style={appStyles.itemText}>{item.text}</Text>
      </TouchableOpacity>
    );
  };
  onPress = item => {
    Toast.info(item.text, 1);
  };

  render() {
    return (
      <BaseLayout>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Carousel />
          <WhiteSpace style={{ backgroundColor: "#f1f1f1" }} />
          <View style={appStyles.gridWrapper}>
            {/*<Text style={appStyles.title}>意甲</Text>*/}
            <Grid
              itemStyle={appStyles.item}
              hasLine={false}
              data={data}
              columnNum={4}
              renderItem={this.renderItem}
            />
          </View>
        </ScrollView>
      </BaseLayout>
    );
  }
}

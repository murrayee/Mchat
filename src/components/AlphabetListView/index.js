"use strict";

import React, { PureComponent } from "react";

import {
  View,
  Text,
  Image,
  SectionList,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Header, BottomTabBar } from "react-navigation";
import styles from "./style";
import { Icon } from "../Icon";
import SearchBox from "../SearchBox";

const { width, height } = Dimensions.get("window");
const LIST_HEADER_HEIGHT = 46;
const ITEM_HEADER_HEIGHT = 30;
const ITEM_HEIGHT = 45;
const LIST_FOOTER_HEIGHT = 80;
const LETTER_ITEM_HEIGHT = 15;
const SEPARATOR_HEIGHT = 0;

export default class Contact extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      popoverShow: false,
      onScrollBeginDrag: false,
      moveActiveLetter: null,
      scrollActiveLetter: null,
      sectionScrollMap: {},
      letterMoveMap: {}
    };
  }

  static defaultProps = {
    data: [],
    total: 0
  };

  componentDidUpdate() {
    this.goupMap = this.calculateGroup();
    this.measureTimer = setTimeout(() => {
      this.letterViewWrap.measure((x, y, width, height, pageX, pageY) => {
        this.measure = {
          py: pageY,
          height
        };
      });
    }, 0);
  }

  componentWillUnmount() {
    this.measureTimer && clearTimeout(this.measureTimer);
    this.popTimer && clearTimeout(this.popTimer);
  }

  responderGrant = e => {
    return true;
  };
  /*用户手指在屏幕上移动手指，没有停下也没有离开*/
  responderMove = e => {
    this.popTimer && clearTimeout(this.popTimer);
    const { onScrollBeginDrag, letterMoveMap } = this.state;
    if (onScrollBeginDrag) {
      this.setState({ onScrollBeginDrag: false });
    }
    const ty = e.nativeEvent.pageY;
    const { py } = this.measure;
    const index = Math.floor((ty - py) / LETTER_ITEM_HEIGHT);
    const lastH = this.goupMap[
      Object.keys(this.goupMap)[Object.keys(this.goupMap).length - 1]
    ];
    // this.lastLetter = this.findAreaLetter(lastH + LIST_FOOTER_HEIGHT - height + 171);
    // const asc = this.getFormatLetters()[index].charCodeAt();
    // const lastAsc = this.lastLetter.charCodeAt();
    // if (asc > lastAsc) {
    //   this.sectionView.scrollToLocation({ animated: true,viewPosition:1 });
    //
    //   this.setState({
    //     letterMoveMap: { ...letterMoveMap, [index]: 1 },
    //     moveActiveLetter: this.lastLetter,
    //     popoverShow: true,
    //   });
    // }
    if (!letterMoveMap[index]) {
      this.setState({
        letterMoveMap: { ...letterMoveMap, [index]: 1 },
        moveActiveLetter: this.getFormatLetters()[index],
        popoverShow: true
      });
      this.scroll(index, 0, ITEM_HEADER_HEIGHT);
    }
  };

  /*用户手指离开屏幕*/
  responderRelease = event => {
    this.popTimer = setTimeout(() => {
      this.setState({ letterMoveMap: {}, popoverShow: false });
    }, 200);
  };
  calculateGroup = () => {
    const arr = this.props.data.map(v => {
      return {
        ...v,
        GROUP_HEIGHT: v.data.length * ITEM_HEIGHT + ITEM_HEADER_HEIGHT
      };
    });
    let total = LIST_HEADER_HEIGHT,
      index = 0,
      len = this.props.data.length;
    const map = {};
    while (index < len) {
      total += arr[index].GROUP_HEIGHT;
      map[arr[index].key] = total;
      index++;
    }
    return map;
  };
  findAreaLetter = h => {
    const letters = Object.keys(this.goupMap);
    let num = 0,
      curLetter;
    while (num < letters.length) {
      if (h > this.goupMap[letters[num]]) {
        num++;
      } else {
        curLetter = letters[num];
        break;
      }
    }
    return curLetter;
  };
  getFormatLetters = () => {
    return this.props.data.map(v => v.key);
  };
  scroll = (sectionIndex, itemIndex, viewOffset) => {
    this.sectionView.scrollToLocation({
      animated: true,
      sectionIndex,
      itemIndex,
      viewOffset
    });
  };
  onEndReached = e => {
    console.log("触发onEndReached", e);
  };
  onScroll = e => {
    const {
      onScrollBeginDrag,
      sectionScrollMap,
      moveActiveLetter
    } = this.state;
    const {
      contentOffset: { y }
    } = e.nativeEvent;
    if (y <= 0 && moveActiveLetter) {
      this.setState({ moveActiveLetter: null });
    }
    if (onScrollBeginDrag) {
      const curLetter = this.findAreaLetter(y);
      if (!sectionScrollMap[curLetter]) {
        this.setState({
          sectionScrollMap: { ...sectionScrollMap, [curLetter]: 1 },
          moveActiveLetter: curLetter
        });
      }
    }
  };
  getItemLayout = (data, index) => {
    const [length, separator, itemHeader, listHeader] = [
      ITEM_HEIGHT,
      SEPARATOR_HEIGHT,
      ITEM_HEADER_HEIGHT,
      LIST_HEADER_HEIGHT
    ];
    return {
      length,
      offset: (length + separator) * index + itemHeader + listHeader,
      index
    };
  };
  renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        onPress={() => this.props.onPressItem(item)}
        style={styles.itemContent}
        underlayColor="#D8D8D8"
        key={item.key}
      >
        <View style={styles.itemWrap}>
          <View>
            <Image style={styles.itemThumb} source={{ url: item.avatar }} />
          </View>
          <Text style={styles.itemTitle}>{item.username}</Text>
        </View>
      </TouchableHighlight>
    );
  };
  renderSectionHeader = ({ section }) => {
    const { moveActiveLetter } = this.state;
    return (
      <View style={styles.sectionWrap}>
        <Text
          style={
            moveActiveLetter === section.key
              ? styles.activeSectionTitle
              : styles.sectionTitle
          }
        >
          {section.key}
        </Text>
      </View>
    );
  };

  renderListFooter = () => {
    return (
      <View style={styles.footerWrap}>
        <Text style={styles.footerText}>{this.props.total}位联系人</Text>
      </View>
    );
  };

  render() {
    const { data, onPressListHeader } = this.props;
    const { moveActiveLetter } = this.state;
    return (
      <View>
        <SectionList
          ref={el => (this.sectionView = el)}
          onScrollBeginDrag={() => this.setState({ onScrollBeginDrag: true })}
          onScrollEndDrag={() => this.setState({ sectionScrollMap: {} })}
          onScroll={this.onScroll}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          ListHeaderComponent={() => <SearchBox onPress={onPressListHeader} />}
          ListFooterComponent={this.renderListFooter}
          scrollsToTop={true}
          stickySectionHeadersEnabled
          sections={data}
          enableEmptySections={true}
          onEndReached={this.onEndReached}
          removeClippedSubviews={false}
          keyExtractor={item => item._id}
          viewabilityConfig={{
            minimumViewTime: 3000,
            viewAreaCoveragePercentThreshold: 100,
            waitForInteraction: true
          }}
        />

        <View pointerEvents="box-none" style={[styles.letterContainer]}>
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.letterIconWrap}
              onPress={() => {
                this.scroll(0, 0, LIST_HEADER_HEIGHT + ITEM_HEADER_HEIGHT);
                this.calculateGroup();
              }}
            >
              <Icon name="ionicons|ios-search" size={12} />
            </TouchableOpacity>
            <View
              ref={el => (this.letterViewWrap = el)}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => true}
              onResponderGrant={this.responderGrant}
              onResponderMove={this.responderMove}
              onResponderRelease={this.responderRelease}
            >
              {this.getFormatLetters().map((item, index) => (
                <View key={index} style={styles.letterWrap}>
                  <View style={{ borderRadius: 15, overflow: "hidden" }}>
                    <Text
                      style={
                        item === moveActiveLetter
                          ? styles.activeLetter
                          : styles.letter
                      }
                    >
                      {item}
                    </Text>
                  </View>
                  {item === moveActiveLetter && this.state.popoverShow && (
                    <View style={styles.popover}>
                      <Text style={styles.popText}>{item}</Text>
                      <View style={styles.popRadian} />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

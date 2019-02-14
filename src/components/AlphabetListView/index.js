import React, { PureComponent } from 'react';

import {
  View,
  Text,
  Image,
  SectionList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import { Icon } from '../Icon';

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
      onScrollBeginDrag: false,
      activeLetter: null,
      activeIndex: null,
      activeMap: {},
    };
  }

  static defaultProps = {
    data: [],
    total: 0,
  };

  componentDidUpdate() {
    this.goupMap = this.calculateGroup();
    this.measureTimer = setTimeout(() => {
      this.letterViewWrap.measure((x, y, width, height, pageX, pageY) => {
        this.measure = {
          py: pageY,
          height,
        };
      });
    }, 0);
  }

  componentWillUnmount() {
    this.measureTimer && clearTimeout(this.measureTimer);
  }

  responderGrant = (e) => {
    return true;
  };
  /*用户手指在屏幕上移动手指，没有停下也没有离开*/
  responderMove = (e) => {
    // const now = new Date().getTime();
    const { onScrollBeginDrag } = this.state;
    if (onScrollBeginDrag) {
      this.setState({ onScrollBeginDrag: false });
    }
    const ty = e.nativeEvent.pageY;
    const { py } = this.measure;
    const index = Math.floor((ty - py) / LETTER_ITEM_HEIGHT);

    this.setActiveStyle(index);
    this.scroll(index, 0, ITEM_HEADER_HEIGHT);

  };

  /*用户手指离开屏幕*/
  responderRelease = (event) => {
    // console.log(event);
  };
  setActiveStyle = (index) => {
    const letters = this.getFormatLetters();
    letters.forEach((v, num) => {
      if (index === num) {
        this[`letterItem${num}`].setNativeProps({
          style: { backgroundColor: '#f2645d', color: 'white', fontWeight: 'bold' },
        });
        // this[`sectionHeader${v.charCodeAt()}`].setNativeProps({
        //   style: { color: '#f2645d', fontWeight: 'bold' },
        // });
      } else {
        this[`letterItem${num}`].setNativeProps({
          style: { backgroundColor: 'transparent', color: '#333333', fontWeight: 'normal' },
        });
        // this[`sectionHeader${v.charCodeAt()}`].setNativeProps({
        //   style: { color: '#333333', fontWeight: 'normal' },
        // });
      }
    });
  };
  calculateGroup = () => {
    const arr = this.props.data.map(v => {
      return { ...v, GROUP_HEIGHT: v.data.length * ITEM_HEIGHT + ITEM_HEADER_HEIGHT };
    });
    let total = LIST_HEADER_HEIGHT, index = 0, len = this.props.data.length;
    const map = {};
    while (index < len) {
      total += arr[index].GROUP_HEIGHT;
      map[arr[index].key] = total;
      index++;
    }
    return map;
  };
  getFormatLetters = () => {
    return this.props.data.map(v => v.key);
  };
  scroll = (sectionIndex, itemIndex, viewOffset) => {
    this.sectionView.scrollToLocation({ animated: true, sectionIndex, itemIndex, viewOffset });
  };
  onEndReached = () => {
    console.log('触发onEndReached');
  };
  onScroll = (e) => {
    const { onScrollBeginDrag, activeMap } = this.state;
    if (onScrollBeginDrag) {
      const { contentOffset: { y } } = e.nativeEvent;
      const letters = Object.keys(this.goupMap);
      let num = 0, curLetter;
      while (num < letters.length) {
        if (y > this.goupMap[letters[num]]) {
          num++;
        } else {
          curLetter = letters[num];
          if (!activeMap[curLetter]) {
            this.setState({ activeMap: { ...activeMap, [curLetter]: 1 } });
            this.setActiveStyle(num);
          }
          break;
        }
      }
    }
  };
  getItemLayout = (data, index) => {
    const [length, separator, itemHeader, listHeader] = [ITEM_HEIGHT, SEPARATOR_HEIGHT, ITEM_HEADER_HEIGHT, LIST_HEADER_HEIGHT];
    console.log(index, (length + separator) * index + itemHeader + listHeader);
    return { length, offset: (length + separator) * index + itemHeader + listHeader, index };
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
            <Image style={styles.itemThumb}
                   source={{ url: item.avatar }}/>
          </View>
          <Text style={styles.itemTitle}>{item.username}</Text>
        </View>
      </TouchableHighlight>
    );
  };
  renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.sectionWrap}>
        <Text style={styles.sectionTitle}
              ref={el => this[`sectionHeader${section.key.charCodeAt()}`] = el}>{section.key}</Text>
      </View>

    );
  };
  renderListHeader = () => {
    return (
      <TouchableOpacity activeOpacity={1} style={styles.searchInfo} onPress={this.props.onPressListHeader}>
        <View style={styles.box}>
          <Icon name='ionicons|ios-search' size={16} style={styles.searchIcon}/>
          <Text style={styles.text}>搜索</Text>
          <Icon name='ionicons|ios-mic' size={18} style={styles.voiceIcon}/>
        </View>
      </TouchableOpacity>

    );
  };
  renderListFooter = () => {
    return (
      <View style={styles.footerWrap}>
        <Text style={styles.footerText}>{this.props.total}位联系人</Text>
      </View>);
  };

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <SectionList
          ref={el => this.sectionView = el}
          onScrollBeginDrag={() => this.setState({ onScrollBeginDrag: true })}
          onScrollEndDrag={() => this.setState({ activeMap: {} })}
          onScroll={this.onScroll}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          ListHeaderComponent={this.renderListHeader}
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
            waitForInteraction: true,
          }}
        />
        <View pointerEvents='box-none' style={styles.letterContainer}>
          <View style={styles.content}
          >
            <TouchableOpacity style={styles.letterIconWrap}
                              onPress={() => {
                                this.scroll(0, 0, LIST_HEADER_HEIGHT + ITEM_HEADER_HEIGHT);
                                this.calculateGroup();
                              }}>
              <Icon name='ionicons|ios-search' size={12}/>
            </TouchableOpacity>
            <View
              ref={el => this.letterViewWrap = el}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => true}
              onResponderGrant={this.responderGrant}
              onResponderMove={this.responderMove}
              onResponderRelease={this.responderRelease}
            >
              {
                this.getFormatLetters().map((item, index) =>
                  <View key={index} style={styles.letterWrap}>
                    <Text style={styles.letter} ref={(el) => this[`letterItem${index}`] = el}>{item}</Text>
                  </View>,
                )
              }
            </View>
          </View>
        </View>
      </View>
    );
  }

}



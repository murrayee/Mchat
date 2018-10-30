/**
 * Created by bear on 2018/2/5.
 */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { List, SwipeAction, Badge } from 'antd-mobile-rn';

import Icon from 'react-native-vector-icons/Ionicons';

const Item = List.Item;
import styles, { customBadgeStyle } from './style';

export default class SessionItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  swipeScrollEvent = (allowParentScroll) => {
    this.props.swipeScrollEvent(allowParentScroll);
  };
  onPress = () => {
    this.props.onPress(this.props.row);
  };
  rightButton = () => {
    return [
      {
        text: '标记未读',
        onPress: () => console.log('cancel'),
        style: {
          backgroundColor: '#ddd',
          color: 'white',
        },
      },
      {
        text: '删除',
        onPress: () => console.log('delete'),
        style: {
          backgroundColor: '#F4333C',
          color: 'white',
        },
      },
    ];
  };

  render() {
    const { row, swipeOutDisable } = this.props;
    return (
      <SwipeAction
        style={styles.info}
        autoClose
        disabled={swipeOutDisable}
        // onScroll={this.swipeScrollEvent}
        right={this.rightButton()}
      >
        <Item onClick={this.onPress} style={styles.itemInfo}>
          <View style={styles.item}>
            <Image style={styles.thumb} source={{ url: 'http://127.0.0.1:9090/public/avatar/201809131715133574.png' }}/>
            <View style={styles.msgInfo}>
              <Text numberOfLines={1} style={styles.title}>{row.item.username}</Text>
              <Text numberOfLines={1} style={styles.brief}>'213213213123' </Text>
            </View>
            <View style={styles.extra}>
              <Text numberOfLines={1} style={styles.extraText}>昨天</Text>
              <Text style={styles.extraIcon}>
                {/*<Icon name="ios-notifications-off-outline" size={14} />*/}
                {/*<Badge text={1} overflowCount={99} size='small' styles={customBadgeStyle}*/}
                       {/*style={{ width: 5, height: 5 }}/>*/}
              </Text>
            </View>
          </View>
        </Item>
      </SwipeAction>
    );
  }
}

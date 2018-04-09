/**
 * Created by bear on 2018/2/5.
 */
import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from '../../components/Icon/index';
import moment from 'moment';
import styles from './style';

export default class TopicsItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, onPress } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPress(item.topics_id)}
      >
        <View style={styles.header}>
          <Image style={styles.avatar} source={{ url: item.avatar }} />
          <Text style={styles.auth}>{item.author} · </Text>
          <Text style={styles.time}>
            {moment(item.create_time)
              .startOf('hour')
              .fromNow()}
          </Text>
          <Text style={styles.more}>
            <Icon
              name="ionicons|ios-more"
              size={20}
              color="#6a6a6a"
              onPress={() => console.log('我是more点击')}
            />
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.text}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.abstract}>{item.abstract}</Text>
          </View>
          <View style={styles.imageInfo}>
            <Image
              source={{ url: item.relevant_img }}
              style={styles.relevant}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.reviewInfo}>
            <View style={styles.box}>
              <Text onPress={() => console.log('我是点赞量点击')}>
                <Icon name="iconfont|shoucang1" size={12} color="#6a6a6a" />
                <Text style={styles.count}> {item.praise_count} · </Text>
              </Text>
            </View>
            <View style={styles.box}>
              <Text onPress={() => console.log('我是评论点击')}>
                <Icon name="iconfont|203" size={12} style="#6a6a6a" />
                <Text style={styles.count}> {item.review_count} </Text>
              </Text>
            </View>
          </View>
          <View style={styles.readInfo}>
            <Text
              onPress={() => console.log('我是阅读点击')}
              style={styles.read}
            >
              {item.read_count} · 阅读
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

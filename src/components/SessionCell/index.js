import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import styles from './style';

export default class SessionCell extends PureComponent {
  isOwn = () => {
    const { row, from } = this.props;
    return from._id === row.item.from._id;
  };

  render() {
    const { row } = this.props;
    const data = row.item;
    return (
      <View style={[styles.messageCell, { flexDirection: this.isOwn() ? 'row-reverse' : 'row' }]}>
        <Image source={{ uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png' }} style={styles.avatar}/>
        <View style={this.isOwn() ? styles.icme : styles.ic}><View
          style={this.isOwn() ? styles.icmecnt : styles.icnt}/></View>
        <View style={[styles.contentView, { backgroundColor: this.isOwn() ? '#CCE4FC' : '#FFFFFF' }]}>
          <Text style={styles.messageCellText}>{data.message.content}</Text>
        </View>
        <View style={styles.endBlankBlock}/>
      </View>
    );
  }
}

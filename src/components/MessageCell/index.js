import React, {PureComponent} from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';
import styles from './style'
export default  class MessageCell extends PureComponent {
    _isOwn = () => {
        const {userProfile, row} = this.props
        let userInfo =userProfile;
        return userInfo._id === row.item.from
    }
    render() {
        const {row} = this.props;
        const data = row.item
        return (
            <View style={[styles.messageCell, {flexDirection:this._isOwn()?'row-reverse':'row'}]}>
                <Image source={{uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png'}} style={styles.avatar}/>
                <View style={this._isOwn() ? styles.icme : styles.ic}><View
                    style={this._isOwn() ? styles.icmecnt : styles.icnt}/></View>
                <View style={[styles.contentView, {backgroundColor:this._isOwn()?'#CCE4FC':'#FFFFFF'}]}>
                    <Text style={styles.messageCellText}>{data.msg.content}</Text>
                </View>
                <View style={styles.endBlankBlock}/>
            </View>
        );
    }
}

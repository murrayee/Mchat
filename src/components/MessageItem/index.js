/**
 * Created by bear on 2018/2/5.
 */
import  React, {PureComponent} from 'react'
import {
    View,
    Text,
    Image
} from 'react-native'
import {List, SwipeAction} from 'antd-mobile';
import Icon from 'react-native-vector-icons/Ionicons'
const Item = List.Item;
import styles  from './style'
export  default  class MessageItem extends PureComponent {
    constructor(props) {
        super(props)
    }
    _swipeScrollEvent = (allowParentScroll) => {
        this.props.swipeScrollEvent(allowParentScroll)
    }
    _onPress = () => {
        this.props.onPress(this.props.row)
    }
    _rightButton=()=>{
        return [
            {
                text: '置顶',
                onPress: () => console.log('cancel'),
                style:{
                    backgroundColor: '#ddd',
                    color: 'white'
                }
            },
            {
                text: '删除',
                onPress: () => console.log('delete'),
                style:{
                    backgroundColor: '#F4333C',
                    color: 'white'
                }
            },
        ]
    }
    render() {
        const {row, swipeOutDisable} = this.props
        console.log(row)
        return (
                    <SwipeAction
                        style={styles.info}
                        autoClose
                        disabled={swipeOutDisable}
                        // onScroll={this._swipeScrollEvent}
                        right={this._rightButton()}
                    >
                        <Item onClick={this._onPress} style={styles.itemInfo}>
                            <View  style={styles.item}>
                                <Image style={styles.thumb} source={{url:row.item.ext.avatar}}/>
                                <View style={styles.msgInfo}>
                                    <Text numberOfLines={1} style={styles.title}>{row.item.ext.name}</Text>
                                    <Text numberOfLines={1} style={styles.brief}>{row.item.msg.content} </Text>
                                </View>
                                <View style={styles.extra}>
                                    <Text numberOfLines={1} style={styles.extraText}>昨天</Text>
                                    <Text style={styles.extraIcon}>
                                        <Icon name="ios-notifications-off-outline" size={14} />
                                    </Text>
                                </View>
                            </View>
                        </Item>
                    </SwipeAction>
        )
    }
}
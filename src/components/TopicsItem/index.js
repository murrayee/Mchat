/**
 * Created by bear on 2018/2/5.
 */
import React, {PureComponent} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
moment.locale('cn')
import styles from './style'
export default class TopicsItem extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const {item} = this.props
        return (
            <TouchableOpacity style={styles.container}
                              onPress={()=>console.log('查看详情')}
            >
                <View style={styles.header}>
                    <Image style={styles.avatar} source={{url: item.avatar}}/>
                    <Text style={styles.auth}>{item.author} · </Text>
                    <Text style={styles.time}>{moment(item.create_time).startOf('hour').fromNow()}</Text>
                    <Icon name='ios-more' size={20} style={styles.more} onPress={()=>console.log('我是more点击')}/>
                </View>
                <View style={styles.content}>
                    <View style={styles.text}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.abstract}>{item.abstract}</Text>
                    </View>
                    <View style={styles.imageInfo}>
                        <Image source={{url:item.relevant_img}} style={styles.relevant}/>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={styles.readInfo} >
                        <Text onPress={()=>console.log('我是阅读点击')} style={styles.read}>{item.read_count} · 阅读</Text>
                    </View>
                    <View style={styles.reviewInfo}>
                        <View style={styles.box} >
                            <Icon name='ios-heart-outline' size={20} style={styles.icon} onPress={()=>console.log('我是点赞量点击')}/>
                            <Text style={styles.count}>{item.praise_count}</Text>
                        </View>
                        <View style={styles.box} >
                            <Icon name='ios-text-outline' size={20} style={styles.icon} onPress={()=>console.log('我是评论点击')}/>
                            <Text style={styles.count}>{item.review_count}</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
}
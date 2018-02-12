/**
 * Created by bear on 2017/6/28.
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    Image,

} from 'react-native';
import {  ListView,ActivityIndicator} from 'antd-mobile'


const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: '李佳鑫',
        des: 'dasdasdasd',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: '李益',
        des: 'dasdasdas',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: '程远泰',
        des: 'dsadasdasdasd',
    },
];


let index = data.length - 1;

const NUM_ROWS = 20;
let pageIndex = 0;


class Message extends Component {
    constructor(props) {
        super(props);
        this.diplayName = "Message"

    }

    render() {
        const {navigation} = this.props

        // const row = (_rowData, sectionID, rowID, highlightRow = (_sId, _rId) => {}) => {
        //     if (index < 0) {
        //         index = data.length - 1;
        //     }
        //     const obj = data[index--];
        //     return (
        //         <View key={rowID} style={{borderBottomWidth:1,borderBottomColor:"#ccc"}}>
        //             <TouchableHighlight
        //                 underlayColor={'rgba(100,100,100,0.2)'}
        //                 style={[{ padding: 8, backgroundColor: 'white' }]}
        //                 onPress={() => {
        //                     highlightRow(sectionID, rowID);
        //                     navigation.navigate('chat', {name: obj.title})
        //                 }}
        //             >
        //                 <View>
        //                     <View style={[{ flexDirection: 'row' }]}>
        //                         <Image style={[{ height: 40, width: 40, marginRight: 8 ,backgroundColor:`rgb(${Math.random(0,255)},${Math.random(0,255)},${Math.random(0,255)})`}]} source={{ }} />
        //                         <View>
        //                             <Text>{obj.title}</Text>
        //                             <Text style={{height:6}}>{}</Text>
        //                             <Text style={[{ fontSize: 12, color: '#ccc' }]}>{obj.des}</Text>
        //                         </View>
        //                     </View>
        //                 </View>
        //             </TouchableHighlight>
        //         </View>
        //     );
        // };

        return (

            <View>

                <Text>3123123123123123123</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#f0f1f1"
    },
    item: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
    },
    image: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#444',
    },
    description: {
        fontSize: 13,
        color: '#999',
    },
});


export default  Message

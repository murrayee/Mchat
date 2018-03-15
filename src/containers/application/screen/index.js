/**
 * Created by bear on 2017/6/28.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CansExample from '../../../components/common/src/index'
import { Grid,Carousel } from 'antd-mobile';
const data = Array.from(new Array(21)).map((_val, i) => ({
    icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
    text: `名字${i}`,
}));
class Application extends Component {
    constructor(props) {
        super(props);
        this.diplayName = "Application"
    }
    componentDidMount(){
    }
    onselectedIndexChange(index) {
        /* tslint:disable: no-console */
        // console.log('change to', index);
    }
    render() {
        return (

            <ScrollView>
                <CansExample/>
                {/*<View style={{ marginTop: 0 }}>*/}
                    {/*<View style={{ paddingHorizontal: 0 }}>*/}
                        {/*<Carousel*/}
                            {/*style={styles.wrapper}*/}
                            {/*autoplayTimeout={4}*/}
                            {/*selectedIndex={2}*/}
                            {/*autoplay*/}
                            {/*infinite*/}
                            {/*afterChange={this.onselectedIndexChange.bind(this)}*/}
                        {/*>*/}
                            {/*<View style={[styles.container, { backgroundColor: 'red' }]}>*/}
                                {/*<Text>Carousel 1</Text>*/}
                            {/*</View>*/}
                            {/*<View style={[styles.container, { backgroundColor: 'blue' }]}>*/}
                                {/*<Text>Carousel 2</Text>*/}
                            {/*</View>*/}
                            {/*<View style={[styles.container, { backgroundColor: 'yellow' }]}>*/}
                                {/*<Text>Carousel 3</Text>*/}
                            {/*</View>*/}
                            {/*<View style={[styles.container, { backgroundColor: 'black' }]}>*/}
                                {/*<Text>Carousel 4</Text>*/}
                            {/*</View>*/}
                            {/*<View style={[styles.container, { backgroundColor: '#ccc' }]}>*/}
                                {/*<Text>Carousel 5</Text>*/}
                            {/*</View>*/}
                        {/*</Carousel>*/}
                    {/*</View>*/}
                {/*</View>*/}

                {/*<View style={[{ margin: 10 }]}><Text>个人线上(webapp)作品</Text></View>*/}
                {/*<View>*/}
                    {/*<Grid data={data}*/}
                          {/*hasLine={true}*/}
                          {/*isCarousel*/}
                          {/*// itemStyle={{ height: 40}}*/}
                          {/*onClick={_el => console.log(_el)}*/}
                    {/*/>*/}
                {/*</View>*/}

            </ScrollView>
        );
    }


}


const styles = StyleSheet.create({
    // containers: {},
    wrapper: {
        backgroundColor: '#fff',
    } ,
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
    } ,
    text: {
        color: '#fff',
        fontSize: 36,
    } ,
});

export default  Application


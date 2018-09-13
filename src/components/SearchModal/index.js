import React, {Component} from 'react';
import {Modal, Alert, View, SafeAreaView} from 'react-native';
import { SearchBar} from 'antd-mobile-rn';
export default class SearchModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputFocus: true,
            value: '美食'
        }
    }
    static getDefaultProps = {
        modalVisible: false
    };
    setModalVisible(visible) {
        this.props.onPress(visible)
    }
    onChange = (value) => {
        this.setState({ value });
    }

    clear = () => {
        this.setState({ value: '' });
        this.setModalVisible(false)
    }
    render() {
        return (
            <SafeAreaView>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        // alert('Modal has been closed.');//android 物理返回键
                    }}>
                    <View style={{marginTop: 50}}>

                            <SearchBar
                                value={this.state.value}
                                placeholder="搜索"
                                onSubmit={(value) => Alert.alert(value)}
                                onCancel={this.clear}
                                onChange={this.onChange}
                                showCancelButton
                            />
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}
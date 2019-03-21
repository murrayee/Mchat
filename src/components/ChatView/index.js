'use strict';

import React, {useEffect, useState, useRef} from 'react';
import {View, Text, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {indexStyles} from "./style";


const defaultProps = {
    messageList: [],
};

const renderItem = ({item}) => {
    console.log(item)
    return (
        <View style={{transform: [{scale: -1}], borderWidth: 1, borderColor: 'red'}}>
            <Text>{item.id}</Text>
        </View>
    )
};

const ChatView = (props = defaultProps) => {
    const {messageList} = props;
    const chatView = useRef(null);


    return (
        <View style={indexStyles.container}>

            <FlatList
                data={messageList}
                ref={chatView}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
};
ChatView.propTypes = {
    /*defaultProps*/
    messageList: PropTypes.array.isRequired,
};

export default ChatView;
/**
 * Created by bear on 2017/12/12.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import SessionItem from '../../../components/SessionItem';
import SearchBox from '../../../components/SearchBox';
import SearchModal from '../../../components/SearchModal';
import Header from '../../../components/Header';
import { createAction } from '../../../utils';


@connect(
  state => {
    return { ...state.session };
  },
  dispatch => bindActionCreators({
    fetchList:
      createAction('session/fetch'),
  }, dispatch),
)
export default class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
      swipeOutDisable: false,
      modalVisible: false,
    };
    this.props.fetchList();
  }

  static navigationOptions = {
    title: '消息',
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  itemOnPress = row => {
    const { navigation } = this.props;
    navigation.navigate('chat', { profile: row.item.ext });
  };
  renderItemComponent = row => {
    return (
      <SessionItem
        row={row}
        onPress={this.itemOnPress}
        swipeScrollEvent={this.swipeScrollEvent}
        swipeOutDisable={this.state.swipeOutDisable}
      />
    );
  };
  swipeScrollEvent = scrollEnabled => {
    this.setState({ scrollEnabled: scrollEnabled });
  };

  render() {
    const { sessionListMap, navigation, sessions } = this.props;
    console.log(sessions);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={sessions}
          keyExtractor={item => item.key}
          showsVerticalScrollIndicator={true} //隐藏竖直滚动条
          // onScroll={this._onScroll}
          scrollEnabled={this.state.scrollEnabled}
          // onRefresh={() => console.log('onRefresh: nothing to refresh :P')}
          // // onViewableItemsChanged={this._onViewableItemsChanged}
          // refreshing={false}
          ListHeaderComponent={<SearchBox navigation={navigation} onPress={this.setModalVisible}/>}
          renderItem={this.renderItemComponent}
        />
        <SearchModal modalVisible={this.state.modalVisible} onPress={this.setModalVisible}/>
      </SafeAreaView>

    );
  }
}


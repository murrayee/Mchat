/**
 * Created by bear on 2017/12/12.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import TopicsItem from '../../../components/TopicsItem/index';
import * as dynamic from '../../../actions/dynamic';
import { indexStyles } from '../styleSheet/index';
import MyCarousel from '../../../components/Carousel/index';
import HeaderRigth from '../../../components/HeaderRight';

@connect(
  state => {
    return { ...state.dynamic };
  },
  dispatch => bindActionCreators({ ...dynamic }, dispatch)
)
export default class Dynamic extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      refreshing: false,
      isLoadingMore: false
    };
  }
  static navigationOptions = props => {
    return {
      headerRight: <HeaderRigth navigation={props.navigation} />
    };
  };

  componentDidMount() {
    this._onRefresh();
  }

  _onRefresh = () => {
    const { getTopicsList, size } = this.props;
    getTopicsList(size, 0, 'onRefresh');
  };

  _loadMore = () => {
    const { getTopicsList, size, isFetching, hasMore } = this.props;
    if (isFetching || !hasMore) {
      return false;
    }
    getTopicsList(size, ++this.props.num, 'onEndReached');
  };
  _itemOnClick = id => {
    const { navigation } = this.props;
    navigation.navigate('article', { id: id });
  };

  render() {
    return (
      <SafeAreaView style={indexStyles.container}>
        <FlatList
          data={this.props.topics}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={true} //隐藏竖直滚动条
          enableEmptySections={true} //数据可以为空
          onRefresh={() => this._onRefresh()}
          refreshing={this.props.refreshing}
          ListHeaderComponent={<MyCarousel />}
          ItemSeparatorComponent={() => <View style={indexStyles.separator} />}
          renderItem={({ item }) => (
            <TopicsItem item={item} onPress={this._itemOnClick} />
          )}
          onEndReached={this._loadMore}
          onEndReachedThreshold={0.1}
        />
      </SafeAreaView>
    );
  }
}

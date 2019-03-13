import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createAction, formatDate } from "@utils";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { Icon } from "@components/Icon";
import { commonStyles, cardStyles, dynamicStyles } from "@styles";

@connect(
  state => ({
    ...state.dynamic,
    refreshing: state.loading.effects["dynamic/fetchTopics"],
    loadMore: state.loading.effects["dynamic/fetchMoreTopics"]
  }),
  dispatch =>
    bindActionCreators(
      {
        fetchTopics: createAction("dynamic/fetchTopics"),
        fetchMoreTopics: createAction("dynamic/fetchMoreTopics")
      },
      dispatch
    )
)
class User extends Component {
  constructor(props, context) {
    super(...arguments);
    this.state = {
      page: 1,
      limit: 10,
      tab: "all",
      mdrender: "false",
      refreshing: false
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    const { tab } = this.state;
    this.refresh(tab);
  }

  refresh = tab => {
    const { page, limit, mdrender } = this.state;
    const { fetchTopics } = this.props;
    fetchTopics({ page, limit, tab, mdrender });
  };
  loadMore = tab => {
    const { mdrender } = this.state;
    const { topics, fetchMoreTopics } = this.props;
    let { limit, page } = topics[tab];
    fetchMoreTopics({ limit, page: ++page, tab, mdrender });
  };
  change = ({ ref: { props } }) => {
    const { tab } = props;
    const { topics } = this.props;
    if (topics[tab]) return false;
    this.refresh(tab);
  };
  renderItemComponent = ({ item }) => {
    return (
      <TouchableOpacity style={cardStyles.card}>
        <View style={cardStyles.header}>
          <Image
            style={cardStyles.avatar}
            source={{ uri: item.author.avatar_url }}
          />
          <View style={cardStyles.titleWrapper}>
            <Text style={cardStyles.title}>{item.author.loginname}</Text>
            <Text style={cardStyles.extra}>
              最新回复 · {formatDate(item.last_reply_at)}
            </Text>
          </View>
          {item.top && <Text style={cardStyles.top}>置顶</Text>}
        </View>
        <Text style={cardStyles.content}>{item.title}</Text>
        <View style={cardStyles.footer}>
          <View style={[commonStyles.flexRowContainer, cardStyles.footerLeft]}>
            <View style={[cardStyles.wrap, { marginRight: 20 }]}>
              <Icon name={`iconfont|mimakejian`} size={12} color="#878787" />
              <Text style={cardStyles.footerText}>{item.visit_count}</Text>
            </View>
            <View style={cardStyles.wrap}>
              <Icon
                name={`iconfont|pinglun`}
                size={12}
                color="#878787"
                style={{ marginTop: 3 }}
              />
              <Text style={cardStyles.footerText}> {item.reply_count}</Text>
            </View>
          </View>
          <Text style={cardStyles.footerText}>
            {formatDate(item.create_at)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  renderFooterComponent = () => {
    const { loadMore } = this.props;
    return (
      <View style={dynamicStyles.footer}>
        {loadMore && <ActivityIndicator />}
      </View>
    );
  };

  render() {
    const { tabs, topics, refreshing = false } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollableTabView
          onChangeTab={this.change}
          initialPage={0}
          style={{ flex: 1, backgroundColor: "#f1f1f1" }}
          tabBarBackgroundColor="#fff"
          tabBarTextStyle={{ fontWeight: "bold" }}
          tabBarActiveTextColor="#1890ff"
          tabBarInactiveTextColor="#333333"
          tabBarUnderlineStyle={{ backgroundColor: "#1890ff", height: 2 }}
          renderTabBar={() => <ScrollableTabBar />}
        >
          {Object.keys(tabs).map((tab, index) => (
            <FlatList
              tabLabel={tabs[tab]}
              tab={tab}
              key={index}
              style={{ flex: 1 }}
              data={topics[tab] ? topics[tab].data : []}
              renderItem={this.renderItemComponent}
              keyExtractor={item => item.id}
              refreshing={refreshing}
              onRefresh={() => this.refresh(tab)}
              onEndReachedThreshold={0.1}
              onEndReached={() => this.loadMore(tab)}
              ListFooterComponent={this.renderFooterComponent}
            />
          ))}
        </ScrollableTabView>
      </SafeAreaView>
    );
  }
}

export default User;

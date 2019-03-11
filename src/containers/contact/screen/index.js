import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../../../components/Header";

import { Animated, SectionList } from "react-native";
import { SafeAreaView } from "react-navigation";

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
import SectionHeader from "../../../components/SectionHeader";
import ContactItem from "../../../components/ContactItem";
import ContactIndexList from "../../../components/ContactIndexList";
import SearchBox from "../../../components/SearchBox";
import SearchModal from "../../../components/SearchModal";
import AlphabetListView from "../../../components/AlphabetListView";
import { styles } from "../styleSheet/index";
import { createAction, formatUserGroup } from "../../../utils";

@connect(
  state => {
    return { ...state.contact };
  },
  dispatch =>
    bindActionCreators(
      {
        fetchContact: createAction("contact/users")
      },
      dispatch
    )
)
export default class Contact extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalVisible: false
    };
    this.scrollPos = new Animated.Value(0);
    this.scrollSinkY = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: { y: this.scrollPos }
          }
        }
      ],
      { useNativeDriver: true }
    );
  }

  static navigationOptions = {
    title: "联系人"
  };

  componentDidMount() {
    this.props.fetchContact();
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };
  onPressItem = item => {
    this.props.navigation.navigate("contactInfo", { profile: item });
  };
  onPressListHeader = () => {
    console.log("123");
  };
  scroll = (sectionIndex, itemIndex) => {
    this.sectionView.getNode().scrollToLocation({ sectionIndex, itemIndex });
  };

  render() {
    const { users, section, navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <AlphabetListView
          total={users.length}
          data={formatUserGroup(users)}
          onPressItem={this.onPressItem}
          onPressListHeader={this.onPressListHeader}
        />
        {/*<AnimatedSectionList*/}
        {/*ref={el => this.sectionView = el}*/}
        {/*onRefresh={() => console.log('onRefresh: nothing to refresh :P')}*/}
        {/*onScroll={this.scrollSinkY}*/}
        {/*refreshing={false}*/}
        {/*showsVerticalScrollIndicator={false}//隐藏竖直滚动条*/}
        {/*renderItem={({ item }) => <ContactItem item={item} onPress={() => this.onPress(item)}/>}*/}
        {/*renderSectionHeader={({ section }) => <SectionHeader section={section}/>}*/}
        {/*ListHeaderComponent={<SearchBox navigation={navigation} onPress={this.setModalVisible}/>}*/}
        {/*stickySectionHeadersEnabled*/}
        {/*sections={users || []}*/}
        {/*enableEmptySections={true}*/}
        {/*removeClippedSubviews={false}*/}
        {/*keyExtractor={item => item._id}*/}
        {/*viewabilityConfig={{*/}
        {/*minimumViewTime: 3000,*/}
        {/*viewAreaCoveragePercentThreshold: 100,*/}
        {/*waitForInteraction: true,*/}
        {/*}}*/}
        {/*/>*/}
        {/*<ContactIndexList letters={sectionListArr(users)} scrollToSection={this.scroll} section={section}/>*/}
        {/*<SearchModal modalVisible={this.state.modalVisible} onPress={this.setModalVisible}/>*/}
      </SafeAreaView>
    );
  }
}

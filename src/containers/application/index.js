"use strict";

import React, {Component} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {PullToRefreshView} from "@components/PullToRefreshView";
import {RefreshView} from "./refreshView";

export default class App extends Component {

  state = {
    title: "Pull down to refresh",
    isRefreshing: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <PullToRefreshView
          minPullDistance={70}
          pullAnimHeight={70}
          pullAnimYValues={{from: -50, to: 10}}
          isRefreshing={this.state.isRefreshing}
          onRefresh={this.onInnerRefresh}
          onTriggerToRefresh={this.onTriggerToRefresh}
          contentComponent={
            <ScrollView>
              <Text style={styles.block1}>BLOCK 1</Text>
              <Text style={styles.block2}>BLOCK 2</Text>
              <Text style={styles.block3}>BLOCK 3</Text>
            </ScrollView>
          }
        >
          <RefreshView title={this.state.title}/>
        </PullToRefreshView>
      </View>
    );
  }


  onInnerRefresh = () => {
    this.setState({title: "Loading..."});
    this.startRefreshing();
  };


  onTriggerToRefresh = (triggered) => {
    this.setState({title: triggered ? "Release to refresh" : "Pull down to refresh"});
  };

  startRefreshing = () => {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 1500);
  };

  stopRefreshing = () => {
    this.setState({isRefreshing: false});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  block1: {
    margin: 2,
    fontSize: 20,
    textAlign: "center",
    lineHeight: 230,
    height: 230,
    backgroundColor: "#9b9287",
  },
  block2: {
    margin: 2,
    fontSize: 20,
    textAlign: "center",
    lineHeight: 230,
    height: 230,
    backgroundColor: "#9b9287",
  },
  block3: {
    margin: 2,
    fontSize: 20,
    textAlign: "center",
    lineHeight: 230,
    height: 230,
    backgroundColor: "#9b9287",
  },
});

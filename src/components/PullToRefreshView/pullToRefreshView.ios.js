"use strict";

import React, {useState, useRef, useEffect, cloneElement} from "react";

import {Animated, View} from "react-native";
import {PullAnimation} from "./pullAnimation";

export const defaultMinPullDistance = 120;
export const defaultPTRBackgroundColor = "#f6f6f6";
export const pullAnimatedBackgroundColor = "#f6f6f6";

const PullAnimationContainer = Animated.View;


export const PullToRefreshViewIos = (
  {
    backgroundColor = defaultPTRBackgroundColor,
    isRefreshing,
    minPullDistance = defaultMinPullDistance,
    onRefresh,
    onTriggerToRefresh,
    contentComponent,
    pullAnimHeight,
    pullAnimYValues,
    children,
  }) => {


  const scrollContentRef = useRef(null);
  const [shouldTriggerRefresh, setShouldTriggerRefresh] = useState(false);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [isScrollFree, setIsScrollFree] = useState(true);

  const onResponderRelease = () => {
    if (!isRefreshing && shouldTriggerRefresh) {
      scrollContentRef.current.scrollTo({y: -minPullDistance});
      setIsScrollFree(false);
      onRefresh();
    }
  };

  const onScrollEvent = (event) => {

    scrollY.setValue(event.nativeEvent.contentOffset.y);
    if (!isScrollFree) {
      return;
    }
    if (event.nativeEvent.contentOffset.y <= -minPullDistance) {
      onTriggerToRefresh && onTriggerToRefresh(true);
      setShouldTriggerRefresh(true);
    } else if (shouldTriggerRefresh) {
      onTriggerToRefresh && onTriggerToRefresh(false);
      setShouldTriggerRefresh(false);
    }
  };

  const innerScrollTo = (y) => {
    scrollContentRef.current.scrollTo({y});
  };

  useEffect(() => {

    console.log(isRefreshing);
    // const {isRefreshing, innerScrollTo, setIsScrollFree, isReachEnd = false, toPosition, scrollY} = this.props;
    if (!isRefreshing) {
      // innerScrollTo(0);
      // setIsScrollFree(true);
    }
    // if ( toPosition) {
    //   innerScrollTo((scrollY)._value + toPosition);
    // }
  });
  return (
    <View style={{
      flex: 1,
      zIndex: -100,
      backgroundColor: backgroundColor,
    }}>
      <PullAnimationContainer
        style={{
          backgroundColor: pullAnimatedBackgroundColor,
          height: scrollY.interpolate({
            inputRange: [-minPullDistance, 0],
            outputRange: [minPullDistance, 0],
          }),
        }}
      >
        <PullAnimation yValues={pullAnimYValues} styleProps={{height: pullAnimHeight}} scrollY={scrollY}
                       isRefreshing={isRefreshing} minPullDistance={minPullDistance}>
          {children}
        </PullAnimation>
      </PullAnimationContainer>
      <View style={{
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}>
        {cloneElement(contentComponent, {
          scrollEnabled: isScrollFree,
          scrollEventThrottle: 16,
          onScroll: onScrollEvent,
          onResponderRelease,
          ref: scrollContentRef,
        })}
      </View>
    </View>
  );
};





















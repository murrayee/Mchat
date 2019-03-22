"use strict";

import React, {useState, useRef, useEffect, cloneElement} from "react";

import {Animated, View, ScrollView} from "react-native";
import {PullAnimation} from "./pullAnimation";

export const defaultMinPullDistance = 120;
export const defaultPTRBackgroundColor = "#f6f6f6";


export const PullToRefreshViewAndroid = (
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

  let scrollContentRef = null;
  let layoutScrollHeight = 0;
  const [shouldTriggerRefresh, setShouldTriggerRefresh] = useState(false);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [isScrollFree, setIsScrollFree] = useState(true);
  const [minHeight, setMinHeight] = useState(0);
  const [refreshHeight, setRefreshHeight] = useState(1);

  const refScrollComponent = (innerRef) => {
    scrollContentRef = innerRef;
  };

  const onLayout = (event) => {
    layoutScrollHeight = event.nativeEvent.layout.height;
    setMinHeight(layoutScrollHeight + refreshHeight);
  };

  const onResponderRelease = () => {
    if (!isRefreshing && shouldTriggerRefresh) {
      scrollContentRef.scrollTo({y: -minPullDistance});
      setIsScrollFree(false);
      onRefresh();
    }
  };

  const onScrollEvent = (event) => {
    if (refreshHeight === 1 && event.nativeEvent.velocity.y < 0) {
      const minHeight = layoutScrollHeight + minPullDistance;
      setMinHeight(minHeight);
      setRefreshHeight(minPullDistance);
    }
    // onScroll && onScroll(event);
    scrollY.setValue(minPullDistance - event.nativeEvent.contentOffset.y);
    const distance = (scrollY)._value;
    if (distance > 5) {
      if (distance === minPullDistance) {
        if (!shouldTriggerRefresh) {
          onTriggerToRefresh && onTriggerToRefresh(true);
          setShouldTriggerRefresh(true);
        }
      } else if (shouldTriggerRefresh) {
        onTriggerToRefresh && onTriggerToRefresh(false);
        setShouldTriggerRefresh(false);
      }
    }
  };
  const onMomentumScrollEnd = () => {

    if (!isRefreshing && (scrollY)._value >= 0) {
      scrollContentRef.scrollTo({y: refreshHeight});
    }
  };
  const onScrollEndDrag = (event) => {
    if (isRefreshing) {
      return;
    }
    const distance = (scrollY)._value;
    if (distance >= minPullDistance) {
      if (!isRefreshing && shouldTriggerRefresh) {
        onRefresh();
      }
    } else if (distance >= 0) {
      scrollContentRef.scrollTo({y: refreshHeight});
    }
  };

  const innerScrollTo = (y) => {
    scrollContentRef.scrollTo({y});
  };

  useEffect(() => {
    setTimeout(() => setIsScrollFree(true), 100);
    // const {isRefreshing, innerScrollTo, setIsScrollFree, isReachEnd = false, toPosition, scrollY} = this.props;
    // if (!isRefreshing) {
    //   if (!isReachEnd) {
    //     innerScrollTo(0);
    //   }
    //   setIsScrollFree(true);
    // }
    // if ( toPosition) {
    //   innerScrollTo((scrollY)._value + toPosition);
    // }
  });
  return (
    <View style={{
      flex: 1,
      backgroundColor: backgroundColor,
    }}>
      <ScrollView ref={refScrollComponent} c
                  ontentContainerStyle={{minHeight}}
                  scrollEnabled={isScrollFree}
                  onScroll={onScrollEvent}
                  onLayout={onLayout}
                  onMomentumScrollEnd={onMomentumScrollEnd}
                  onScrollEndDrag={onScrollEndDrag}>
        <View style={{
          height: refreshHeight,
          backgroundColor: backgroundColor,
          overflow: "visible",
        }}>
          <PullAnimation
            yValues={pullAnimYValues}
            styleProps={{height: pullAnimHeight}}
            scrollY={
              scrollY.interpolate({
                inputRange: [0, minPullDistance],
                outputRange: [0, -minPullDistance],
              })
            }
            isRefreshing={isRefreshing}
            minPullDistance={minPullDistance}
          >
            {children}
          </PullAnimation>
        </View>
        {cloneElement(contentComponent, {
          scrollEnabled: false,
        })}
      </ScrollView>
    </View>
  );
};





















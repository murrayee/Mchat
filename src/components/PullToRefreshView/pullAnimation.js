"use strict";

import React, {cloneElement, Children} from "react";
import {Animated, UIManager} from "react-native";

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);


export const PullAnimation = ({styleProps, isRefreshing, scrollY, minPullDistance, yValues, children}) => (
  <Animated.View
    style={[
      styleProps,
      {
        top: scrollY.interpolate({
          inputRange: [-minPullDistance, 0],
          outputRange: [yValues.to || yValues.to === 0 ? yValues.to : yValues.from, yValues.from],
          extrapolate: "clamp",
        }),
        position: "absolute",
      },
    ]}
  >
    {Children.map(children, (child) => {
      return cloneElement(child, {
        isRefreshing,
        scrollY,
        minPullDistance,
      });
    })}
  </Animated.View>

);

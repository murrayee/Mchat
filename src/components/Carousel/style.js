import { StyleSheet, Dimensions, Platform } from 'react-native';
const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const slideHeight = viewportHeight;
const slideWidth =viewportWidth;
const itemHorizontalMargin = wp(1);
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
const entryBorderRadius = 8;
export  const colors = {
    black: '#bebebe',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};
export default StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageContainerEven: {
        backgroundColor: colors.black
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',

    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: colors.black
    },

    slider: {
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        // paddingVertical: 10 // for custom animation
    },
});

import React, { Component } from "react"
import { StyleSheet, Text, View, Image, Dimensions } from "react-native"
import * as Animatable from "react-native-animatable"
import { Header } from "react-navigation"
import HeaderImageScrollView, { TriggeringView } from "react-native-image-header-scroll-view"

const MIN_HEIGHT = Header.HEIGHT
const MAX_HEIGHT = 200
const styles = StyleSheet.create({
    nav: {
        position: "absolute",
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        zIndex: 1000,
    },
    image: {
        height: MAX_HEIGHT,
        width: Dimensions.get("window").width,
        alignSelf: "stretch",
        resizeMode: "cover",
    },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 16,
        opacity: 0,
    },
    navTitle: {
        color: "white",
        fontSize: 18,
        backgroundColor: "transparent",
    },
    titleContainer: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
    },
    imageTitle: {
        color: "white",
        backgroundColor: "transparent",
        fontSize: 24,
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
        backgroundColor: "white",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    sectionContent: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        textAlign: "justify",
    },
})

export default class HeaderImageScrollViews extends Component {
    static navigationOptions = {
        headerTintColor: "white",
        headerTitle: null,
        headerStyle: {
            position: "absolute",
            top: 0,
            elevation: 0,
            shadowColor: "transparent",
            shadowRadius: 0,
            shadowOffset: {
                height: 0,
            },
        },
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <HeaderImageScrollView
                    maxHeight={MAX_HEIGHT}
                    minHeight={MIN_HEIGHT}
                    maxOverlayOpacity={0.1}
                    minOverlayOpacity={0.3}
                    fadeOutForeground
                    renderHeader={() => (
                        <Image source={require('./79f6013381fda5221972db3dfb500931.jpg')}
                            style={styles.image}
                        />
                    )}
                    renderFixedForeground={() => (
                        <Animatable.View
                            style={styles.navTitleView}
                            ref={navTitleView => {
                                this.navTitleView = navTitleView
                            }}
                        >
                            <Text style={styles.navTitle}> 个人信息 </Text>
                        </Animatable.View>
                    )}
                    renderForeground={() => (
                        <View style={styles.titleContainer}>
                            <Text style={styles.imageTitle}>  个人信息 </Text>
                        </View>
                    )}
                >
                    {/*<TriggeringView*/}
                        {/*style={styles.section}*/}
                        {/*onHide={() => this.navTitleView.fadeInUp(200)}*/}
                        {/*onDisplay={() => this.navTitleView.fadeOut(100)}*/}
                    {/*>*/}
                        {/*<Text style={styles.sectionTitle}> 个人信息  </Text>*/}
                    {/*</TriggeringView>*/}




                </HeaderImageScrollView>
            </View>
        )
    }
}

import React, { Component }  from 'react';
import {
    PanResponder,
    StyleSheet,
    View,
    Text,
    processColor,
} from 'react-native';

var CIRCLE_SIZE = 80;

export default class PanResponderMazouri extends Component {

    constructor(props) {
        super(props);
        this._handleStartShouldSetPanResponder = this._handleStartShouldSetPanResponder.bind(this);
        this._handleMoveShouldSetPanResponder = this._handleMoveShouldSetPanResponder.bind(this);
        this._handlePanResponderGrant = this._handlePanResponderGrant.bind(this);
        this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
        this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this);
        this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this);
        this._highlight = this._highlight.bind(this);
        this.state = {
            _panResponder: {},
            _previousLeft: 0,
            _previousTop: 0,
            backgroundColor: 'green',
        }
    }

    componentWillMount() {
        console.log("MAZOURI_LOG componentDidMount");
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });

        this.setState({
            _previousLeft: 20,
            _previousTop: 84,
            left: 20,
            top: 84,
            backgroundColor: 'green',
        });

    }

    componentDidMount() {
        console.log("MAZOURI_LOG componentDidMount");
    }

    render() {
        console.log("MAZOURI_LOG left:"+ this.state.left + "top:" + this.state.top + "backgroundColor:" + this.state.backgroundColor);
        return (
            <View style={styles.container}>
                <View
                    ref={circle => this.circle = circle}
                    style={[styles.circle, {left: this.state.left, top: this.state.top, backgroundColor: this.state.backgroundColor}]}
                    {...this._panResponder.panHandlers}
                />
            </View>
        );
    }

    _handleStartShouldSetPanResponder(e, gestureState) {
        console.log("MAZOURI_LOG _handleStartShouldSetPanResponder");
        return true;
    }

    _handleMoveShouldSetPanResponder(e, gestureState) {
        console.log("MAZOURI_LOG _handleMoveShouldSetPanResponder");
        return true;
    }

    _handlePanResponderGrant(e, gestureState) {
        console.log("MAZOURI_LOG _handlePanResponderGrant");
        this._highlight;
    }

    _handlePanResponderMove(e, gestureState) {
        console.log("MAZOURI_LOG _handlePanResponderMove");
        var _left = this.state._previousLeft + gestureState.dx;
        var _top = this.state._previousTop + gestureState.dy;
        this.setState({
            left: _left,
            top: _top,
        });
    }

    _handlePanResponderEnd(e, gestureState) {
        console.log("MAZOURI_LOG _handlePanResponderEnd");
        this._unHighlight;
        var _previousLeft = this.state._previousLeft + gestureState.dx;
        var _previousTop = this.state._previousTop + gestureState.dy;
        this.setState({
            _previousLeft: _previousLeft,
            _previousTop: _previousTop,
        });

    }

    _highlight() {
        this.setState({
            backgroundColor: 'blue',
        });
    }

    _unHighlight() {
        this.setState({
            backgroundColor: 'green',
        });
    }

}

var styles = StyleSheet.create({
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    container: {
        flex: 1,
        paddingTop: 64,
    },
});
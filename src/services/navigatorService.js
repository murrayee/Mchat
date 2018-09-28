import {
    StackActions,
    NavigationActions,
} from 'react-navigation';

let _navigator; // eslint-disable-line

function setContainer(container) {
    _navigator = container;
}

function reset(routeName, params) {
    _navigator.props.dispatch(
        StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName, params,}),
            ],
        }),
    );
}

function navigate(routeName, params) {
    _navigator.props.dispatch(
        NavigationActions.navigate({
            type: 'Navigation/NAVIGATE',
            routeName,
            params,
        }),
    );
}

function navigateDeep(actions) {
    _navigator.props.dispatch(
        actions.reduceRight(
            (prevAction, action) =>
                StackActions.navigate({
                type: 'Navigation/NAVIGATE',
                routeName: action.routeName,
                params: action.params,
                action: prevAction,
            }),
            undefined,
        ),
    );
}

function getCurrentRoute() {
    if (!_navigator || !_navigator.state.nav) {
        return null;
    }

    return _navigator.state.nav.routes[_navigator.state.nav.index] || null;
}

export default {
    setContainer,
    navigateDeep,
    navigate,
    reset,
    getCurrentRoute,
};
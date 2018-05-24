import {
    NavigationActions,
} from 'react-navigation';

let _container; // eslint-disable-line

function setContainer(container) {
    _container = container;
}

function reset(routeName, params) {
    _container.props.navigation.dispatch(
        NavigationActions.init({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    type: 'Navigation/INIT',
                    routeName,
                    params,
                }),
            ],
        }),
    );
}

function navigate(routeName, params) {
    _container.props.navigation.dispatch(
        NavigationActions.navigate({
            type: 'Navigation/NAVIGATE',
            routeName,
            params,
        }),
    );
}

function navigateDeep(actions) {
    _container.props.navigation.dispatch(
        actions.reduceRight(
            (prevAction, action) =>
            NavigationActions.navigate({
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
    if (!_container || !_container.state.nav) {
        return null;
    }

    return _container.state.nav.routes[_container.state.nav.index] || null;
}

export default {
    setContainer,
    navigateDeep,
    navigate,
    reset,
    getCurrentRoute,
};
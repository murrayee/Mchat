import {
  StackActions,
  NavigationActions,
} from 'react-navigation';

export default {

  setContainer(container) {
    this.navigator = container;
  },
  reset(routeName, params) {
    this.navigator.props.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName, params}),
        ],
      }),
    );
  },

  navigate(routeName, params) {
    this.navigator.props.dispatch(
      NavigationActions.navigate({
        type: 'Navigation/NAVIGATE',
        routeName,
        params,
      }),
    );
  },

  navigateDeep(actions) {
    this.navigator.props.dispatch(
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
  },

  getCurrentRoute() {
    if (!this.navigator.props || !this.navigator.props.state) {
      return null;
    }

    return this.navigator.props.state.routes[this.navigator.props.state.index] || null;
  }
}



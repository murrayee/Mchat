import {
  StackActions,
  NavigationActions,
} from 'react-navigation';

class navigatorService {
  setContainer = (container) => {
    this.navigator = container;
  };
  reset = (routeName, params) => {
    this.navigator.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName, params }),
        ],
      }),
    );
  };

  navigate = (routeName, params) => {
    this.navigator.dispatch(
      NavigationActions.navigate({
        type: 'Navigation/NAVIGATE',
        routeName,
        params,
      }),
    );
  };

  navigateDeep = (actions) => {
    this.navigator.dispatch(
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
  };

  getCurrentRoute = () => {
    if (!this.navigator || !this.navigator.state.nav) {
      return null;
    }

    return this.navigator.state.nav.routes[this.navigator.state.nav.index] || null;
  };
}

export default new navigatorService();

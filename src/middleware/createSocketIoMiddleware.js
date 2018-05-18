
export const createSocketIoMiddleware=store=>next => action =>  {
    // 判断action type是否为NAVIGATE类型 并且是需要验证的页面
    const state = store.getState()
    // console.log(state.nav.routes[0].routeName)
    if (state.nav.routes[0].routeName === 'login' ) {
        // store.dispatch({type: NavigationActions.NAVIGATE, routeName: 'login'});



    }

    return next(action)



}


/**
 * Created by bear on 2018/2/5.
 */
import Routers from "../navigation/navigator"

const nav = (state, action) => {
    const newState = Routers.router.getStateForAction(action, state)
    return newState || state
}

export default nav

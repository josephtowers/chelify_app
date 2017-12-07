import Root from '../components'
import { NavigationActions } from 'react-navigation'
const initialState = Root.router.getStateForAction(NavigationActions.init());

export const navReducer = (state = initialState, action) => {
  const nextState = Root.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default navReducer;
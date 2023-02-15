import { Types } from './types'
// counter.js
const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case [Types.SET_USER]:
      return {...state, user: state.user + 1};
    case 'DECREMENT':
      return {...state, count: state.count - 1};
    default:
      return state;
  }
};

export default authReducer;
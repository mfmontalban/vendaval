import { VERIFY } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case VERIFY:
      return action.payload;
    default:
      return state;
  }
}

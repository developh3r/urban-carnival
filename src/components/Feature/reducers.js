import { actionTypes } from "./actions";

const DEFAULT_STATE = {
  // add default state here
};

export const featureReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actionTypes.ACTION_NAME:
      return action.payload;
    default:
      return state;
  }
};

import { actionTypes } from "./actions";

const DEFAULT_STATE = {
  notes: ""
};

export const addNoteReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTES:
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};

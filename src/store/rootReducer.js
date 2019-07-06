import { combineReducers } from "redux";
import addNoteReducer from "./../components/HowAreYou/reducers";

const rootReducer = combineReducers({
  // add reducers here
  // todo: todoReducer
  addNoteReducer
});

export default rootReducer;

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import throttle from "lodash/throttle";

import rootReducer from "./rootReducer";
import { loadState, saveState } from "./storage";

const persistedState = loadState();
let store = null;

if (process.env.NODE_ENV === "production") {
  store = createStore(
    rootReducer,
    persistedState,
    compose(applyMiddleware(thunk))
  );
} else {
  store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(thunk))
  );
}

store.subscribe(
  throttle(() => {
    const state = store.getState();
    saveState({
      // add redux states here
      // todo: state.todo
    });
  }, 1000)
);

export { store };

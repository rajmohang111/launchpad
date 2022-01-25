import { applyMiddleware, createStore, Dispatch } from "redux";
import rootReducer from "./main";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";

export type DispatchAction = (dispatch: Dispatch) => any;


const composeEnhancers = composeWithDevTools({
  name: "Launch Pad"
});

const middlewares = [
  thunk,
  promiseMiddleware()
];

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middlewares),
));

export default store;

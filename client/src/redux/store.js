import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducer/authReducer";
import sheetsReducer from "./reducer/sheetsReducer";

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  sheets: sheetsReducer
});

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;

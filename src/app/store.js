import rootReducer from "../reducers";
import { createStore, applyMiddleware } from "redux";

const store = createStore(rootReducer, applyMiddleware());

export default store;

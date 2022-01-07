import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import reducer from "./reducers";

let middleware = [thunk];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, logger];
}

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;

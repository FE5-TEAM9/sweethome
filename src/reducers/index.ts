import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import info from "./info";
import cart from "./cart";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["info", "cart"]
};
const rootReducer = combineReducers({
  info, cart
});
export default persistReducer(persistConfig, rootReducer);

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import info from "./info";
import cart from "./cart";
import logout from "./logout";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["info", "cart", "logout"]
};
const rootReducer = combineReducers({
  info,
  cart,
  logout
});
export default persistReducer(persistConfig, rootReducer);

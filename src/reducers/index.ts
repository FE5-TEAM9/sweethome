import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import info from "./info";
import cart from "./cart";
import logout from "./logout";
import selectedCart from "./selectedCart";
import account from "./account";
import user from "./user"
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["info", "cart", "logout", "selectedCart", "account","user"]
};

const rootReducer = combineReducers({
  info,
  cart,
  logout,
  selectedCart,
  account,
  user
});

export default persistReducer(persistConfig, rootReducer);

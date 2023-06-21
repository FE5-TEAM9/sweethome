import { combineReducers } from "redux";
import info from "./info";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["info"]
};
const rootReducer = combineReducers({
  info
});
export default persistReducer(persistConfig, rootReducer);

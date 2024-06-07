import { combineReducers  } from "redux";
import posts from "./Posts";
import authReducer from "./Auth";
export const rootReducer = combineReducers({
    posts,
    auth:authReducer,
});
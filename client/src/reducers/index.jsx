import { combineReducers  } from "redux";
import postReducer from "./Posts";
import authReducer from "./Auth";
export const rootReducer = combineReducers({
    posts:postReducer,
    auth:authReducer,
});
import { combineReducers  } from "redux";
import posts from "./Posts";
export const rootReducer = combineReducers({
    posts: posts,
});
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

const posts = (state = [], action) => {
    switch (action.type) {
        case UPDATE:
        case LIKE:
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [action.payload, ...state];
        case DELETE:
            return state.filter((post) => post._id !== action.payload);
        default:
            return state;
    }
};
export default posts;

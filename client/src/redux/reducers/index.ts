import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import isLoadingPostReducer from './isLoadingPostReducer';

const rootReducer = combineReducers({
    posts: postsReducer,
    isLoadingPost: isLoadingPostReducer
});

export default rootReducer;
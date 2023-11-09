import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import postsReducer from './postsReducer';
import userReducer from './userReducer';
import storage from 'redux-persist/lib/storage';
import pageReducer from './pageReducer';

const rootReducer = combineReducers({
    posts: postsReducer,
    user: userReducer,
    page: pageReducer
});

export default persistReducer({
    key: 'root',
    storage,
    whitelist: ['user']
}, rootReducer);
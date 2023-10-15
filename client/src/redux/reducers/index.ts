import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import userReducer from './userReducer';
import { persistReducer, PersistConfig  } from 'redux-persist';
import { RootState } from '../actionTypes';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    posts: postsReducer,
    user: userReducer
});

export default persistReducer({
    key: 'root',
    storage,
    whitelist: ['user']
}, rootReducer);
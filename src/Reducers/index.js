import { combineReducers } from 'redux';
import CryptoReducer from './CryptoReducer';
import NewsReducer from './NewsReducer';

export default combineReducers({
    crypto: CryptoReducer,
    news: NewsReducer
})
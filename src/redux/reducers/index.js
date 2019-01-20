import { combineReducers } from 'redux';
import UserSignInReducer from './UserSignInReducer';
import WordsReducer from './WordsReducers';

const rootReducer = combineReducers({
  UserSignInReducer,
  WordsReducer
});

export default rootReducer;

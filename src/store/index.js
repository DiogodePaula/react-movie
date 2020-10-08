import { createStore, combineReducers } from 'redux';
import { persistStore } from 'redux-persist';
import persistedReducer from './persistReducers';

import login from './login/reducer';

const reducers = combineReducers({
  login,
});
const store = createStore(persistedReducer(reducers));
const persistor = persistStore(store);

export { store, persistor };

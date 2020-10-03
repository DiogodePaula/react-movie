import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
// import reducer from './login/reducer';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'growdev',
      storage,
    },
    reducers
  );
  return persistedReducer;
};

import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from 'services/reducers';
import thunk from 'redux-thunk';

export const store = createStore(rootReducer, applyMiddleware(thunk));

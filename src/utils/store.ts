import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from 'services/reducers';
import thunk from 'redux-thunk';
import { socketMiddleware } from 'services/wsMiddleware/socketMiddleware';
import { wsUrl } from './constants';

const composeEnhancers =
  ((window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) ||
  compose;

  const enhancer = composeEnhancers(
    applyMiddleware(
      thunk,
      socketMiddleware(wsUrl)
    )
  );

export const store = createStore(rootReducer, enhancer);

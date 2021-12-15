import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from "services/reducers";
import App from "./components/App/App";
import thunk from 'redux-thunk';
import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.querySelector('#root')
)

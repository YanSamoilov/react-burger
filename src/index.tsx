import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App/App';
import { store } from 'utils/store';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter basename="react-burger">
    <Provider store={store} >
      <App />
    </Provider>
  </BrowserRouter>,
  document.querySelector('#root')
)

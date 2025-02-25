import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import store from './store/Store.jsx'
import {Provider} from 'react-redux'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)

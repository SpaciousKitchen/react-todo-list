import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppReducer from './App.reducer'; //reducer사용을 위해 변경
import * as serviceWorker from './serviceWorker';
ReactDOM.render(<AppReducer />, document.getElementById('root'));

serviceWorker.unregister();

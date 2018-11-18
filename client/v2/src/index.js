import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from './App';
import Share from './share';
// import Share from './share';
import * as serviceWorker from './serviceWorker';

import { parseQueryString } from './utils';

const params = parseQueryString(window.location.search);

if (params.board != null && params.board.length === 64) {
  const board = params.board.split('').map(s => parseInt(s, 10));
  ReactDOM.render(<App shareBoard={board}/>, document.getElementById('root'));
//  ReactDOM.render(<Share board={board}/>, document.getElementById('root'));
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

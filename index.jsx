import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Board from './source/board.jsx';
import store from './source/core/store';

ReactDOM.render(<Provider store={store}><Board /></Provider>, document.querySelector('.app'));
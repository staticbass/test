/**
 * Created by supervlad on 23.04.16.
 */

import { createStore, applyMiddleware } from 'redux';
import boardReducer from './reducers';
import createLogger from 'redux-logger';

const logger = createLogger();

export default createStore(boardReducer, applyMiddleware(logger));

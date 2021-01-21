import React from 'react';
import App from './App';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import {render} from 'react-dom';
import {rootReducer} from './redux/rootReducer';

require('./styles.css');

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

render(app, document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import ImageReducer from './store/reducers/images';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    images: ImageReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const root = <Provider store={store}>
        <App />
</Provider>

ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();

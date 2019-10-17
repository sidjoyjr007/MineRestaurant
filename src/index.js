import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import LoginReducer from './store/reducers/loginReducer'
import firebaseReducer from './store/reducers/firebase'
import thunk from 'redux-thunk'

const rootReducer=combineReducers({
    login:LoginReducer,
    firebase:firebaseReducer
})
const store=createStore(rootReducer,applyMiddleware(thunk))
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


serviceWorker.unregister();

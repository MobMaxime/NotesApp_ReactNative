/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import Task from './src/screens/TaskList';
import {name as appName} from './app.json';
import { createStore ,applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {appReducer} from './src/reducers';
import {Router} from 'react-native-router-flux';
import { connect,Provider } from 'react-redux';
import thunk from 'redux-thunk';

const loggerMiddleware = createLogger()
const ConnectedRouter = connect()(Router);
const store = createStore(appReducer,applyMiddleware(thunk,loggerMiddleware))

export default class ReduxApp extends React.Component{
    render()
    {
        return(
            <Provider store={store}>
                <ConnectedRouter scenes={App}/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent(appName, () => ReduxApp);

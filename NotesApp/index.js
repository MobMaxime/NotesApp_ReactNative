/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { createStore ,applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {appReducer} from './src/reducers';
import {Router} from 'react-native-router-flux';
import { connect,Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {MenuProvider} from 'react-native-popup-menu';

const loggerMiddleware = createLogger()
const ConnectedRouter = connect()(Router);
const store = createStore(appReducer,applyMiddleware(thunk,loggerMiddleware))

export default class ReduxApp extends React.Component{
    render()
    {
        return(
            <MenuProvider>
                <Provider store={store}>
                    <ConnectedRouter scenes={App}/>
                </Provider>
            </MenuProvider>
            
        );
    }
}

AppRegistry.registerComponent(appName, () => ReduxApp);

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import TaskList from './src/screens/TaskList';
import AddTask from './src/screens/AddTask';
import EditTask from './src/screens/EditTask';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';
import appColors from './src/configs/colors';


const initialState={
    theme:'#2196F3'
}

const reducer = (state=initialState,action)=>{
    switch(action.type)
    {
        case 'THEME1':
            return {theme:appColors.ThemeColor}
        case 'THEME2':
            return {theme:appColors.ThemeDarkBlueColor}    
    }
    return state;
}
const store = createStore(reducer)

class App extends Component{
  render()
  {
    return(
      <Provider store={store}>
          <MenuProvider>  
            <AppContainer/>
        </MenuProvider> 
      </Provider>
    );
  }
}

const AppNavigator = createStackNavigator({
  Task:TaskList,
  AddTask:AddTask,
  EditTask:EditTask
});

const AppContainer =  createAppContainer(AppNavigator);

export default App






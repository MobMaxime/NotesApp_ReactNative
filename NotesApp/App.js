import {Image,StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {Actions, ActionConst, Scene, Stack, Modal, Lightbox, Tabs, Router} from 'react-native-router-flux'
import taskView from './src/screens';
import appcolors from './src/configs/colors'
import {TASK_ICON,TASK_DONE} from './src/configs/images'

const taskIcon = ()=>{
  return <Image source={TASK_ICON} style={styles.TabIconStyle} resizeMode='contain' />
}
const taskDoneIcon = ()=>{
  return <Image source={TASK_DONE} style={styles.TabIconStyle} resizeMode='contain' />
}
const styles = StyleSheet.create({
  TabIconStyle :{
      width:20,
      height:20,
      tintColor:'#FFFFFF',
  },
  navigationStyle:{
    color:'#FFFFFF',
    tintColor:'#FFFFFF',
    backgroundColor:appcolors.ThemeColor,
    elevation:null,
    borderBottomColor:'transparent',
    borderBottomWidth:1, 
    height:40,   
  },
  TabStyle:{
    height:50,
    
  },
  barTitleStyle:{
    color:'#FFFFFF',

  }
  
});
const Scenes = Actions.create(
  
  <Modal key='root' hideNavBar={false} title='TO-DO' navigationBarStyle={styles.navigationStyle}>
         <Tabs key="taskTab" tabBarPosition="top" titleStyle={styles.barTitleStyle} showLabel={false} showIcon={true} indicatorStyle={{backgroundColor:'white'}} tabBarStyle={styles.TabStyle}>  
                <Stack key='Tab1' icon={taskIcon}  hideNavBar={false} >
                    <Scene key="taskList" component={taskView.TaskList} hideNavBar />
                </Stack>
                <Stack key='Tab2' icon={taskDoneIcon} hideNavBar={false} >
                    <Scene key="taskList" component={taskView.TaskList} hideNavBar />
                </Stack>              
              </Tabs>
            <Scene key="addTask" component={taskView.AddTask} />
            <Scene key="editTask" component={taskView.EditTask} />   
  </Modal>
    
);
export default Scenes


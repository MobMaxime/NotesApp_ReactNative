import React, {Component} from 'react';
import {Actions, ActionConst, Scene, Stack, Modal, Lightbox, Tabs, Router} from 'react-native-router-flux'
import taskView from './src/screens';

const Scenes = Actions.create(
  <Modal key='root' hideNavBar={true}>
          <Stack key='task' type={ActionConst.RESET} backTitle=" " >
              <Scene key="taskList" component={taskView.TaskList} title="TO-DO"  />
              <Scene key="addTask" component={taskView.AddTask} title="Add Task"/>
              <Scene key="editTask" component={taskView.EditTask} title="Edit Task"/>
        </Stack>
  </Modal>
    
);
export default Scenes
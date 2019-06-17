import {Image,StyleSheet,Text, View} from 'react-native';
import React from 'react';
import {Actions,ActionConst, Scene, Router, Tabs, Stack} from 'react-native-router-flux'
import taskView from './src/screens';
import localizedString from './src/configs/AllStrings';
import appcolors from './src/configs/colors'
import globals from './src/configs/globals';
import {TASK_ICON,TASK_DONE} from './src/configs/images'
import MenuOption from './src/component/OptionMenu';
import {TabBar} from 'react-native-tab-view';

const taskNewIcon= ({ title, focused }) => {
  let imageName,selectedColor;
  selectedColor = {width:25,height:25,alignSelf:'center',tintColor:focused ? appcolors.ThemeWhiteColor : appcolors.ThemeLightGrayColor};

  switch (title) {
      case localizedString.tab_task_incomplete:
          imageName = TASK_ICON;
          break;

      case localizedString.tab_task_complete:
          imageName = TASK_DONE;
          break;
  }
  return ( <Image source={imageName} style={selectedColor} resizeMode='contain'/> );
}

const taskIcon= ()=> {
  return ( <Image source={TASK_ICON} style={styles.TabIconStyle} resizeMode='contain'/> );
}
const taskDoneIcon= ()=> {
  return ( <Image source={TASK_DONE} style={styles.TabIconStyle} resizeMode='contain'/> );
}

const styles = StyleSheet.create({
  TabIconStyle :{
      width:20,
      height:20,
      tintColor:appcolors.ThemeWhiteColor,
  },
  navigationStyle:{
    color:appcolors.ThemeWhiteColor,
    tintColor:appcolors.ThemeWhiteColor,
    backgroundColor:appcolors.ThemeColor,
    elevation:null,
    borderBottomColor:'transparent',
    borderBottomWidth:1, 
    height:40, 
  },
  TabStyle:{
    height:50,
    backgroundColor:appcolors.ThemeColor
  },
  barTitleStyle:{
    color:appcolors.ThemeWhiteColor,
    fontFamily:globals.FONT_LATO_BOLD,
    fontSize: 20
  }
});

const NavigationBar=()=>{
return(<View style={{backgroundColor:appcolors.ThemeColor, height:90, flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end'}}>
          <Text style={[styles.barTitleStyle,{flex:1, textAlign:'center', marginLeft:30, marginBottom:5}]}>{localizedString.main_task_header}</Text>
          <MenuOption/>
       </View>)
};

const Scenes = Actions.create(
  <Router key='root'>
              <Tabs key='taskTab'
                  type={ActionConst.RESET}
                  title={localizedString.main_task_header}
                  tabBarPosition="top" tabs={true} showLabel={false} showIcon={true}
                  titleStyle={styles.barTitleStyle}
                  navBar={NavigationBar}
                  navigationBarStyle={styles.navigationStyle}
                  renderRightButton={MenuOption}
                  tabBarComponent={(props) => <TabBar {...props} renderLabel={()=>{}}
                  style={[styles.TabStyle,{backgroundColor:appcolors.ThemeColor}]}
                  indicatorStyle={{backgroundColor:appcolors.ThemeWhiteColor}} />}>
                  <Stack key="incompleteTab" title={localizedString.tab_task_incomplete} icon={taskIcon} hideNavBar>
                      <Scene key="taskIncomplete" component={taskView.TaskList}/>
                  </Stack>
                  <Stack key="completeTab" title={localizedString.tab_task_complete} icon={taskDoneIcon} hideNavBar>
                      <Scene key="taskComplete" component={taskView.TaskList}/>
                  </Stack>
             </Tabs>
        <Scene key="editTask" component={taskView.EditTask} />   
  </Router>
);
export default Scenes
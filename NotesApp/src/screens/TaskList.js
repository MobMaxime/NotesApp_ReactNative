import React ,{Component} from 'react';
import {Text,View,Image,StyleSheet,FlatList,TouchableOpacity, StatusBar} from 'react-native';
import {EDIT_ICON,DELETE_ICON} from '../../src/configs/images';
import localizedString from '../configs/AllStrings';
import appcolors from '../configs/colors'
import Moment from 'moment';
import globals from '../configs/globals';
import database from '../configs/database'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';

function mapStateToProps (state) {
    return state
  }
class TaskList extends Component{

    constructor(props)
    {
        super(props);              
        this.state = {
            taskList:[],
            taskDetail:null,
            selectedTaskId:null,            
        }
    }
    
    componentWillMount()
    {
    }

    renderActionButton(){
        return(<ActionButton buttonColor={appcolors.ThemeColor} onPress={() => Actions.editTask({isEdit:false})} style={styles.bottomButton}/>);
    }

    static onEnter()
    {
        globals.setSelectedTheme();
        Actions.refresh({entered:new Date()});
    }
    componentWillReceiveProps(nextProps)
    {
        if (!this.props.entered && nextProps.entered || this.props.entered && this.props.entered !== nextProps.entered) {
            this.getRefersh();
        }
    }
    componentDidMount(){
        this.getRefersh();
    }
    getTaskList(status) {
        database.getTaskList(status).then((taskList)=>{
            this.setState({taskList: taskList})     
        });
    }
   getRefersh()
   {
        if(Actions.currentScene == 'taskIncomplete')
            this.getTaskList(false)
        else if(Actions.currentScene == 'taskComplete')
            this.getTaskList(true)
   }
    componentWillUnmount()
    {

    }
    clickHandler=()=>{
        
    }
    clickOnEdit=(taskItem)=>{
        Actions.editTask({task:taskItem, isEdit:true});

    }
    formateDateAndTime = (date)=>{
        return `${Moment(date).format('DD MMM, YYYY')} ${Moment(date).format("hh:mm A")}`
    }

    renderFlatListItem(taskItem){
        return(
            <View style={[styles.TaskView,{backgroundColor:appcolors.ThemeColor}]}>
                    <View style={styles.listTextContainer}>
                        <Text style={styles.listItemText}>{taskItem.Description}</Text>
                        <Text style={styles.listItemText}>{this.formateDateAndTime(taskItem.TaskDate)}</Text>
                        {(taskItem.Status) ? <Text style={styles.listItemText}>{localizedString.txt_task_complete}</Text> :null}
                    </View>   
                    <TouchableOpacity 
                        onPress={() => {database.clickOnDelete(taskItem.TaskId).then(function(deleted){
                                        if(deleted)
                                            Actions.reset(Actions.currentScene);
                        });}}
                        activeOpacity={0.7}>
                        <Image
                            source={DELETE_ICON}
                            style={styles.rightIcon}/>
                    </TouchableOpacity>
                    {
                        (!taskItem.Status)?
                        <TouchableOpacity 
                            onPress={()=>this.clickOnEdit(taskItem)}
                            activeOpacity={0.7}>
                            <Image
                                source={EDIT_ICON}
                                style={styles.rightIcon}/>
                        </TouchableOpacity>:null
                    }
                </View>
        );
    }

    render()
    {
        const AppStatusBar = () => (<StatusBar backgroundColor={appcolors.ThemeColor} translucent={false} barStyle="light-content" />);
        const {taskList} = this.state;

        if(taskList.length == 0)
            return(
                <View style={[styles.containerMain,{backgroundColor:appcolors.ThemeBackgroundColor}]}>
                    <Text style={[styles.textNoData,{color:appcolors.ThemeDarkColor}]}>{localizedString.txt_no_task}</Text>
                    <AppStatusBar/>
                    {this.renderActionButton()}
                </View>
            );
        else
        {
            return(
                <View style={[styles.containerMain,{backgroundColor:appcolors.ThemeBackgroundColor}]}>
                    <FlatList data={taskList}
                        extraData={this.props}
                        keyExtractor={item=> item.TaskId}
                        renderItem={({item})=>this.renderFlatListItem(item)}>
                        </FlatList>     
                        <AppStatusBar/>
                    {this.renderActionButton()} 
                </View>  
            );
        }        
    }
    
}
export default connect(mapStateToProps)(TaskList);

const styles = StyleSheet.create({
    containerMain:{
        flex:1,
        justifyContent:'center',
        backgroundColor:appcolors.ThemeBackgroundColor
    },
    textNoData:{
        color:appcolors.ThemeWhiteColor,
        textAlign:'center',
        fontFamily:globals.FONT_LATO_REGULAR,
        fontSize:16
    },
    listTextContainer:{
        flex:1,
        flexDirection:'column'
    },
    listItemText:{
        margin:5,
        fontSize:15,
        color:appcolors.ThemeWhiteColor,
        fontFamily:globals.FONT_APP
    },
    bottomButton:{
        bottom:-20,
        right:-20
    },
    TaskView:{        
        flex:1,
        flexDirection:'row',
        margin:5,
        backgroundColor:appcolors.ThemeColor,
        alignItems:'center',
        borderRadius:5,
        borderWidth:1,
        borderColor:appcolors.ThemeLightGrayColor,
        elevation:4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10        
    },
    leftIcon:{
        width:40,
        height:40,
        margin:5
    },
    rightIcon:{
        width:20,
        height:20,
        margin:10,
        tintColor:appcolors.ThemeWhiteColor
    },
    addButton:{
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: appcolors.ThemeColor,                                    
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10,
    },
    MainContainer: {
        bottom:60,
        height:30,
        right:0,
        backgroundColor:'transparent'
      },    
      actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: appcolors.ThemeWhiteColor,
      }
});
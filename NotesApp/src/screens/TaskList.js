import React ,{Component} from 'react';
import {Text,View,Image,StyleSheet,FlatList,TouchableOpacity,StatusBar} from 'react-native';
import {EDIT_ICON,MENU_ICON,DELETE_ICON} from '../../src/configs/images';
import ActionButton from 'react-native-action-button';
import localizedString from '../configs/AllStrings';
import appcolors from '../configs/colors'
import {Menu,MenuOptions,MenuOption,MenuTrigger} from 'react-native-popup-menu';
import Moment from 'moment';
import globals from '../configs/globals';
import database from '../configs/database'
import { Actions} from 'react-native-router-flux';
import theme from 'react-native-theme';

theme.add({
    title:{
        color:'blue'
    },
},'red');

export default class TaskList extends Component{

    constructor(props)
    {
        super(props);              
        this.state = {
            taskList:[],
            taskDetail:null,
            selectedTaskId:null,            
        }
    }    
    static navigationOptions =({navigation})=>{
        const { params ={}} = navigation.state;

        return{
            title:localizedString.main_task_header,
        headerStyle:{
            backgroundColor:appcolors.ThemeColor
        },
        headerTintColor:appcolors.ThemeWhiteColor,
        headerLeft:null,
        }
    }
    componentWillMount()
    {
    }

    static onEnter()
    {
        setTimeout(function(){
            Actions.refresh({entered:new Date()});
        },50)
        
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

    renderActionButton(){
        return(<ActionButton buttonColor={appcolors.ThemeColor} onPress={() => Actions.editTask({isEdit:false})} style={styles.bottomButton}/>);
    }
    renderTaskStatus(){
        return (<Text style={styles.listItemText}>{localizedString.txt_task_complete}</Text>)
    }

    render()
    {
        const {taskList} = this.state;
        const AppStatusBar = () => (<StatusBar backgroundColor={appcolors.ThemeColor} translucent={false} barStyle="light-content" />);

        if(taskList.length == 0)
            return(
                <View style={styles.containerMain}>
                     <AppStatusBar />
                    <Text style={styles.textNoData}>No Task Available</Text>
                    {this.renderActionButton()}
                </View>
            );
        else
        {
            return(
                <View style={styles.containerMain}>
                    <AppStatusBar />
                    <FlatList data={taskList}
                        keyExtractor={item=> item.TaskId}
                        renderItem={({item})=>(
                            <View style={styles.TaskView}>
                                <View style={styles.listTextContainer}>
                                    <Text style={styles.listItemText}>{item.Description}</Text>
                                    <Text style={styles.listItemText}>{this.formateDateAndTime(item.TaskDate)}</Text>
                                    {(item.Status) ? this.renderTaskStatus():null}
                                </View>   
                                <TouchableOpacity 
                                    onPress={() => {database.clickOnDelete(item.TaskId).then(function(deleted){
                                                    if(deleted)
                                                        Actions.refresh({entered:new Date()})
                                    });}}
                                    activeOpacity={0.7}>
                                    <Image
                                        source={DELETE_ICON}
                                        style={styles.rightIcon}/>
                                </TouchableOpacity>
                                {
                                    (!item.Status)?
                                    <TouchableOpacity 
                                        onPress={()=>this.clickOnEdit(item)}
                                        activeOpacity={0.7}>
                                        <Image
                                            source={EDIT_ICON}
                                            style={styles.rightIcon}/>
                                    </TouchableOpacity>:null
                                }
                                
                            </View>
                        )}>
                        </FlatList>  
                        {this.renderActionButton()}        
                </View>     
                          
            );
        }        
    }
}

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
    
      },
});
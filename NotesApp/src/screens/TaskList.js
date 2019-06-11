import React ,{Component} from 'react';
import {Text,View,Image,StyleSheet,FlatList,TouchableOpacity,Alert} from 'react-native';
import {EDIT_ICON,MENU_ICON,DELETE_ICON} from '../../src/configs/images';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import SQLite from "react-native-sqlite-storage";
import localizedString from '../configs/AllStrings';
import appcolors from '../configs/colors'
import colors from '../configs/Utils'
import {Menu,MenuOptions,MenuOption,MenuTrigger} from 'react-native-popup-menu';
import {connect} from 'react-redux';
import globals from '../configs/globals';
import database from '../configs/database'
import { Actions} from 'react-native-router-flux';


export default class TaskList extends Component{
    constructor(props)
    {
        super(props);              
        const db = SQLite.openDatabase(
            {
                name:'TaskDatabase.db',
                location:'default',
                createFromLocation:'~www/TaskDatabase.db',
            },
            ()=>{},
            error=>{
                console.log(error);
            }            
        );
        this.state = {
            db,
            taskList:[],
            taskDetail:null,
            taskCount:0,
            selectedTaskId:null,
        }
    }    
    static navigationOptions =({navigation})=>{
        const { params ={}} = navigation.state;

        return{
            title:localizedString.main_task_header,
        headerStyle:{
            backgroundColor:colors.ThemeColor
        },
        headerTintColor:appcolors.ThemeWhiteColor,
        headerLeft:null,
        headerRight: (
                <Menu>
                <MenuTrigger><Image style={{width:15,height:15,margin:10}} source={MENU_ICON}/></MenuTrigger>
                    <MenuOptions style={{backgroundColor:colors.ThemeColor}}>
                        <MenuOption 
                            customStyles={{optionText: { color:appcolors.ThemeWhiteColor},fontFamily:globals.FONT_APP}} 
                            text='Theme1' />
                        <MenuOption 
                            onSelect={()=>colors.ThemeColor=appcolors.ThemeDarkBlueColor}
                            customStyles={{optionText: { color:appcolors.ThemeWhiteColor},fontFamily:globals.FONT_APP}} 
                            text='Theme2' />
                    </MenuOptions>
                </Menu>
                ),
        }
    }
    componentWillMount()
    {
        
    }
    static onEnter()
    {
        setTimeout(function(){
            Actions.refresh({entered:new Date()});
        },200)
        
    }
    componentWillReceiveProps(newProps)
    {
        if(this.props.entered!=newProps.entered)
        {
            this.getTaskList();
        }
    }
    componentDidMount(){
        // this.props.navigation.setParams({
        //     theme:this.props.theme,
        //     changeTheme:this.props.changeThemeColor,
        // })
        this.getTaskList();
    }
    getTaskList() {
        const { db } = this.state;
        db.transaction(tx => {
        tx.executeSql('SELECT * FROM TaskList;', [], (tx, results) => {
            const rows = results.rows;
            let taskList = [];
            this.setState({
                taskCount:rows.length
            })
            for (let i = 0; i < rows.length; i++) {
                taskList.push({
                ...rows.item(i),
            });
            }
            this.setState({ taskList  });
        });
        });
    }
   
    componentWillUnmount()
    {

    }
    clickHandler=()=>{
        
    }
    clickOnEdit=(task)=>{
        this.props.navigation.navigate('EditTask',{task},)
    }
    render()
    {
        const {tasks} = this.state;
        const {taskList} = this.state;
        const {taskCount} = this.state;
        
        if(taskList.length<1)
            return(
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text>No Task Available</Text>
                    <ActionButton  buttonColor={colors.ThemeColor} onPress={() => Actions.addTask()} style={{bottom:-20,right:-20}}/> 
                </View>
                
            );
        else
        {
            return(
                <View style={{flex:1}}>
                    <FlatList data={taskList}
                        renderItem={({item})=>(
                            <View style={styles.TaskView}>
                                <View style={{flex:1,flexDirection:'column'}}>
                                    <Text style={{margin:5,fontFamily:globals.FONT_APP,}}>{item.Description}</Text>
                                    <Text style={{margin:5,fontSize:12,color:'gray',fontFamily:globals.FONT_APP,}}>{item.TaskDate} {item.TaskTime}</Text>
                                </View>   
                                <TouchableOpacity 
                                    onPress={() => {database.clickOnDelete(item.TaskId),Actions.refresh({entered:new Date()})}}
                                    activeOpacity={0.7}>
                                    <Image
                                        source={DELETE_ICON}
                                        style={styles.rightIcon}/>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => Actions.editTask({task:item}) }
                                    activeOpacity={0.7}>
                                    <Image
                                        source={EDIT_ICON}
                                        style={styles.rightIcon}/>
                                </TouchableOpacity>
                            </View>
                        )}>
                        </FlatList>  
                                             
                        <ActionButton  buttonColor={colors.ThemeColor} onPress={()=>Actions.addTask()} style={{bottom:-20,right:-20}}/>          
                </View>     
                          
            );
        }        
    }
}
// function mapStateToProps(state){
//     return{
//         theme:state.theme
//     }
// }
// function mapDispatchToProps(dispatch){
//     return{
//         changeThemeColor:()=>dispatch({type:'THEME1'}),
//     }
// }
//export default connect(mapStateToProps,mapDispatchToProps)(TaskList)
const styles = StyleSheet.create({
    TaskView:{        
        flex:1,
        flexDirection:'row',
        margin:2,
        backgroundColor:'white',
        alignItems:'center',
        borderRadius:5,
        borderWidth:1,
        borderColor:'lightgray',        
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
        //tintColor:colors.ThemeColor,
    },
    addButton:{
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: '#ee6e73',                                    
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
        color: 'white',
    
      },
});
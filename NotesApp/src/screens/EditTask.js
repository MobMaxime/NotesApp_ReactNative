import React ,{Component} from 'react';
import {Text,View,Image,StyleSheet,TextInput,TouchableOpacity,Alert} from 'react-native';
import {DATE_ICON,TIME_ICON,CANCEL_ICON} from '../../src/configs/images';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import localizedString from '../configs/AllStrings';
import appcolors from '../configs/colors'
import database from '../configs/database'
import globals from '../configs/globals';
import { Actions } from 'react-native-router-flux';
import {CheckBox} from 'react-native-elements';

export default class EditTask extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            isDateTimePickerVisible:false,
            isTimePickerVisible:false,
            pickeMode:null,
            pickerTitle:null,
            Description:'',
            TaskId:'',
            taskDate:'',
            taskTime:'',
            checked:false,
        }
    }
    static navigationOptions=({navigation})=>{
        const { params = {} } = navigation.state;
        let SceneTitle = (params.isEditMode) ? localizedString.edit_task_header : localizedString.add_task_header
        return{
            title: SceneTitle,
            headerStyle:{
                backgroundColor:appcolors.ThemeColor
            },
            headerTitleStyle:{
                fontFamily:globals.FONT_LATO_BOLD,
                fontSize: 20
            },
            headerTintColor:appcolors.ThemeWhiteColor,
            headerLeft: (
                <TouchableOpacity onPress={()=>Actions.pop()} >
                    <Image source={CANCEL_ICON} style={{width:22,height:22,marginLeft:15, marginRight:5}}/>
                </TouchableOpacity>)
            }
        };
    componentDidMount(){
        this.props.navigation.setParams({ isEditMode: this.props.isEdit });
        let isTaskAvailable = this.props.task != null
        let taskId = (isTaskAvailable)&&(this.props.task.TaskId);
        let taskDate = (isTaskAvailable)?(this.props.task.TaskDate):Moment(new Date()).format('DD MMM, YYYY');
        let taskTime = (isTaskAvailable)?(this.props.task.TaskTime):Moment(new Date()).format("h:mm A");
        let taskDescription = (isTaskAvailable)&&(this.props.task.Description);

        this.setState({
            TaskId:taskId,
            taskDate:taskDate,
            taskTime:taskTime,
            Description:taskDescription
        })
    }
    componentWillUnmount()
    {
        // const {db} = this.state;
        // db.close();
    }
    showDateTimePicker=()=>{
        this.setState({
            pickeMode:'date',
            pickerTitle:localizedString.txt_pick_date,
            isDateTimePickerVisible:true
        });
    }    
    hideDateTimePicker=()=>{
        this.setState({
            isDateTimePickerVisible:false
        });
    }    
    handleDatePicked = dateTime =>{       
        if(this.state.pickeMode=='date')
        {
            this.setState({            
                taskDate:Moment(dateTime).format('DD MMM, YYYY'),
            });
        }else
        {
            this.setState({            
                taskTime:Moment(dateTime).format("h:mm A"),
            });
        }  
        this.hideDateTimePicker();
    }   
    showTimePicker=()=>{
        this.setState({
            pickeMode:'time',
            pickerTitle:localizedString.txt_pick_time,
            isDateTimePickerVisible:true
        });
    }
    clickOnSave=()=>{
        const{Description}= this.state;
        if(Description=="")
            Alert.alert(localizedString.required_task);
        else
        {
            const { TaskId } = this.state;
            const { Description } = this.state;
            const { taskDate } = this.state;
            const { taskTime } = this.state;
            if(this.props.isEdit)
                database.updateTaskData(TaskId,Description,taskDate,taskTime);
            else
                database.insertTaskData(Description,taskDate,taskTime);    
            Actions.pop();
        }
    }
    clickOnDelete=(id)=>{
        database.clickOnDelete(id);    
   }

    renderCheckBox(){
        return(
        <CheckBox containerStyle={styles.checkBox} iconRight size={28} 
        checkedColor={appcolors.ThemeWhiteColor} 
        textStyle={styles.checkBoxTitle} title={localizedString.txt_mark_status} 
        checked={this.state.checked} onPress={()=>this.setState({checked:!this.state.checked})}/>);
    }

    render()
    {
        return(
            <View style={styles.container}>
                {this.props.isEdit && this.renderCheckBox()}
                <View style={styles.taskView}>
                    <Text style={styles.taskTitle}>Task</Text>
                    <TextInput style={styles.textView} defaultValue={this.state.Description} onChangeText={(value) => this.setState({ Description: value })} placeholder={localizedString.txt_enter_task} placeholderTextColor={appcolors.ThemeLightGrayColor} />
                    <View style={{marginTop:10}}>
                        <TouchableOpacity style={styles.taskButton} onPress={this.showDateTimePicker} activeOpacity={0.7}>
                            <Text style={styles.taskText}>{this.state.taskDate}</Text>
                                <Image
                                    source={DATE_ICON}
                                    style={styles.taskIcon}/>
                            </TouchableOpacity>                            
                        <TouchableOpacity style={styles.taskButton} onPress={this.showTimePicker} activeOpacity={0.7}>
                            <Text style={styles.taskText}>{this.state.taskTime}</Text>
                                <Image
                                    source={TIME_ICON}
                                    style={styles.taskIcon}/>
                        </TouchableOpacity>  
                        <DateTimePicker 
                            isVisible={this.state.isDateTimePickerVisible}
                            onCancel={this.hideDateTimePicker}
                            onConfirm={this.handleDatePicked}
                            mode={this.state.pickeMode}
                            titleIOS={this.state.pickerTitle}        
                        />                      
                    </View>   
                </View>
            
                <TouchableOpacity style={styles.button} onPress={this.clickOnSave}> 
                   <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity > 
                {this.props.isEdit &&
                <TouchableOpacity style={styles.button} onPress={()=>this.clickOnDelete(this.state.TaskId)}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>}
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: appcolors.ThemeBackgroundColor,
        flex:1
    },
    checkBox:{
        backgroundColor: 'transparent', 
        borderColor:'transparent' 
    },
    checkBoxTitle:{
        flex:1, 
        fontFamily:globals.FONT_APP, 
        fontSize: 17, 
        color: appcolors.ThemeWhiteColor,
        marginLeft: -10
    },
    taskView:{
        margin:10,
        flexDirection:'column'
    },
    button: {
        backgroundColor: appcolors.ThemeColor,
        height:36,
        margin:10,
        borderRadius: 18,
        justifyContent:'center',
        alignItems:'center'
      },
      buttonText:{
        color:appcolors.ThemeWhiteColor,
        fontFamily:globals.FONT_LATO_BOLD,
        fontSize: 15
      },
      taskButton:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:20,
        height: 40
      },
      taskText:{
        flex:1,
        fontFamily:globals.FONT_APP,
        fontSize: 16,
        color: appcolors.ThemeWhiteColor
      },
      taskIcon:{
        width:20,
        height:20,
        justifyContent:'center',
        tintColor:appcolors.ThemeWhiteColor
    },
    taskTitle:{
        color:appcolors.ThemeLightGrayColor,
        fontFamily:globals.FONT_LATO_BOLD,
        fontSize: 19
    },
    textView:{
        borderBottomWidth: 1,
        borderBottomColor: appcolors.ThemeLightGrayColor,
        height:40,
        paddingLeft:8,
        marginTop:5,
        fontFamily:globals.FONT_APP,
        fontSize: 16,
        color:appcolors.ThemeWhiteColor
    },
})
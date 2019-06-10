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

export default class EditTask extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            isDateTimePickerVisible:false,
            isTimePickerVisible:false,
            pickeMode:null,
            Description:'',
            TaskId:'',
            Description:'',
            taskDate:'',
            taskTime:'',
        }
    }
    static navigationOptions=({navigation})=>{
        return{
            title:localizedString.edit_task_header,
            headerStyle:{
                backgroundColor:appcolors.ThemeColor
            },
            headerTintColor:appcolors.ThemeWhiteColor,
            headerLeft: (
                <TouchableOpacity onPress={()=>Actions.pop()} >
                    <Image source={CANCEL_ICON} style={{width:20,height:20,margin:10}}/>
                </TouchableOpacity>)
            }
        };
    componentDidMount(){
        this.setState({
            TaskId:this.props.task.TaskId,
            taskDate:this.props.task.TaskDate,
            taskTime:this.props.task.TaskTime,
            Description:this.props.task.Description,
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
                taskDate:Moment(dateTime).format('DD-MM-YYYY'),
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
            database.updateTaskData(TaskId,Description,taskDate,taskTime);    
            this.props.navigation.goBack();
        }
    }
    clickOnDelete=(id)=>{
        let val;
        val = database.clickOnDelete(id);    
        this.props.navigation.goBack();        
    }
    render()
    {
        return(
            <View>
                <View style={styles.taskView}>
                    <Text>Task</Text>
                    <TextInput   defaultValue={this.state.Description} onChangeText={(value) => this.setState({ Description: value })} style={styles.textView} placeholder='enter new task'/>
                    <View style={{marginTop:20}}>
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <Text style={{flex:1,fontFamily:globals.FONT_APP,}}>{this.state.taskDate}</Text>
                            <TouchableOpacity
                                onPress={this.showDateTimePicker}
                                activeOpacity={0.7}>
                                <Image
                                    source={DATE_ICON}
                                    style={styles.taskIcon}/>
                            </TouchableOpacity>                            
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
                            <Text style={{flex:1,fontFamily:globals.FONT_APP,}}>{this.state.taskTime}</Text>
                            <TouchableOpacity
                                onPress={this.showTimePicker}
                                activeOpacity={0.7}>
                                <Image
                                    source={TIME_ICON}
                                    style={styles.taskIcon}/>
                            </TouchableOpacity>
                        </View>  
                        <DateTimePicker 
                            isVisible={this.state.isDateTimePickerVisible}
                            onCancel={this.hideDateTimePicker}
                            onConfirm={this.handleDatePicked}
                            mode={this.state.pickeMode}        
                        />                      
                    </View>   
                </View>
            <View style={{flexDirection:'row',}}>
                <TouchableOpacity style={styles.button} onPress={this.clickOnSave}> 
                    <View >
                        <Text style={{color:'white',fontFamily:globals.FONT_APP}}>Save</Text>
                    </View>
                </TouchableOpacity > 
                <TouchableOpacity style={styles.button} onPress={()=>database.clickOnDelete(this.state.TaskId)}>
                    <View >
                        <Text style={{color:'white',fontFamily:globals.FONT_APP}}>Delete</Text>
                    </View>
                </TouchableOpacity>
            </View> 
        </View>
        );
    }
}

const styles = StyleSheet.create({
    taskView:{
        margin:10,
        flexDirection:'column'
    },
    button: {
        flex:1,
        backgroundColor: appcolors.ThemeColor,
        height:30,
        width:'40%',
        margin:10,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 5,      
      },
      taskIcon:{
        width:20,
        height:20,
        justifyContent:'center',
        tintColor:appcolors.ThemeColor
    },
    textView:{
        borderColor:'lightgray',
        borderWidth:1,
        borderRadius:5,
        height:40,
        paddingLeft:10,
        fontFamily:globals.FONT_APP,
    },
})
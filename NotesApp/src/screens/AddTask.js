import React ,{Component} from 'react';
import {Text,View,Image,StyleSheet,FlatList,ScrollView,Button,TouchableOpacity} from 'react-native';
import {DATE_ICON,TIME_ICON} from '../../src/configs/images';
import { TextInput } from 'react-native-gesture-handler';

export default class AddTask extends Component{
    constructor(props)
    {
        super(props);
        this.state = {

        }
    }
    static navigationOptions={
        title:'Add Task',
        headerStyle:{
            backgroundColor:'#2196F3'
        },
        headerTintColor:'white'
    }
    render()
    {
        return(
            <View>
                <View style={styles.taskView}>
                    <Text>Task</Text>
                    <TextInput style={styles.underline} placeholder='enter new task'/>

                    <View style={{marginTop:20}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{flex:1}}>PickDate</Text>
                            <Image style={styles.taskIcon} source={DATE_ICON}/>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{flex:1}}>SelectTime</Text>
                            <Image  style={styles.taskIcon} source={TIME_ICON}/>
                        </View>
                    </View>                    

                    <View style={styles.buttonView}>
                        <TouchableOpacity > 
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Save</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </View>
                        </TouchableOpacity>
                    </View>    
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
    underline: 
    {textDecorationLine:'underline'},
    button: {
        backgroundColor: '#2196F3',
        height:40,
        width:120,
        margin:20,
        alignItems:'center',
        justifyContent: 'center'
      },
    buttonText: {
        padding:5,
        color: 'white'
      },
      buttonView:{
        flex: 1,
        flexDirection: 'row'
      },
      taskIcon:{
        width:20,
        height:20,
        margin:10,
        marginLeft:150
    },
})
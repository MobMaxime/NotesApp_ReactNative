import React ,{Component} from 'react';
import {Text,View,Image,StyleSheet,FlatList,ScrollView,Button,TouchableOpacity} from 'react-native';
import {NEXT_ICON,DELETE_ICON,ADD_ICON} from '../../src/configs/images';

export default class TaskList extends Component{
    constructor(props)
    {
        super(props);
        this.state = {

        }
    }
    static navigationOptions={
        title:'TO-DO',
        headerStyle:{
            backgroundColor:'#2196F3'
        },
        headerTintColor:'white'
    }
    clickHandler=()=>{
        this.props.navigation.navigate('AddTask')
    }
    clickOnEdit=()=>{
        this.props.navigation.navigate('EditTask')
    }
    render()
    {
        return(
            <View>
                <FlatList data={[
                        {key:'Task1'},
                        {key:'Task2'},
                        {key:'Task3'},
                        {key:'Task4'},
                        {key:'Task5'},
                        {key:'Task6'},
                        {key:'Task7'},
                    ]}
                    renderItem={({item})=>(
                        <View style={styles.TaskView}>
                            <TouchableOpacity
                                onPress={this.clickOnEdit}
                                activeOpacity={0.7}>
                                <Image
                                    source={NEXT_ICON}
                                    style={styles.leftIcon}/>
                            </TouchableOpacity>
                            <Text style={styles.textView}>{item.key}</Text>
                            <Image style={styles.rightIcon} source={DELETE_ICON}/>
                        </View>
                    )}
                    >
                    </FlatList>
                    <View style={styles.MainContainer}>
                        <TouchableOpacity
                        onPress={this.clickHandler}
                            activeOpacity={0.7}
                            style={styles.TouchableOpacityStyle}>
                            <Image
                                source={ADD_ICON}
                                style={styles.FloatingButtonStyle}/>
                        </TouchableOpacity>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    TaskView:{        
        flex:1,
        flexDirection:'row',
        height:60,
        margin:2,
        backgroundColor:'white',
        alignItems:'center',
        borderRadius:5,
        borderWidth:1,
        borderColor:'lightgray'
    },
    textView:{
       margin:10 ,
       flex:1
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        top:80
      },
     
      TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
      },
     
      FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
      },
})
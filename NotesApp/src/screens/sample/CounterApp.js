import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

class CounterApp extends Component{

    render()
    {
        return(
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <TouchableOpacity onPress={()=>this.props.increaseCounter()}>
                    <Text>Increase</Text>
                </TouchableOpacity>
                <Text>{this.props.counter}</Text>
                <TouchableOpacity onPress={()=>this.props.decreaseCounter()}>
                    <Text>Decrease</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps(state){
    return{
        counter:state.counter
    }
}
function mapDispatchToProps(dispatch){
    return{
        increaseCounter:()=>dispatch({type:'INCREASE_COUNTER'}),
        decreaseCounter:()=>dispatch({type:'DECREASE_COUNTER'}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CounterApp)
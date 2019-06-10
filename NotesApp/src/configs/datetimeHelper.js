
import Moment from 'moment';
const dateTimeHelper = {
    isDateTimePickerVisible:false,
    isTimePickerVisible:false,
    pickerMode:null,
    taskDate:Moment(Date().now).format('DD-MM-YYYY'),
    taskTime:Moment(Date().getTime).format('HH:mm:ss'),
    showDateTimePicker:()=>{
        this.setState({
            pickeMode:'date',
            isDateTimePickerVisible:true
        });
    },    
    hideDateTimePicker:()=>{
        this.setState({
            isDateTimePickerVisible:false
        });
    } ,
    showTimePicker:()=>{
        this.setState({
            pickeMode:'time',
            isDateTimePickerVisible:true
        });
    },
    handleDatePicked : dateTime =>{
        console.log("A date has been picked: ", dateTime);        
        if(this.state.pickeMode=='date')
        {
            this.setState({            
                taskDate:Moment(dateTime).format('DD-MM-YYYY'),
            });
        }else
        {
            this.setState({            
                taskTime:Moment(dateTime).format('HH:mm:ss'),
            });
        }        
        this.hideDateTimePicker();
    }
};
export default dateTimeHelper
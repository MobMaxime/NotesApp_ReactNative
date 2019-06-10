import React,{Component} from 'react';
import SQLite from "react-native-sqlite-storage";
import {Alert} from 'react-native';
import localizedString from '../configs/AllStrings'
export default class  dbOperation extends Component
{
    static getTaskList() {
        dbConnection().transaction(tx => {
        tx.executeSql('SELECT * FROM TaskList;', [], (tx, results) => {
            const rows = results.rows;
            let taskList = [];
            for (let i = 0; i < rows.length; i++) {
                taskList.push({
                ...rows.item(i),
            });
            }
            return taskList;
        });
        });
    }
    static insertTaskData(Description,taskDate,taskTime)
    {
        dbConnection().transaction(tx => {
        tx.executeSql('INSERT INTO TASKLIST(Description,TaskDate,TaskTime) values(?,?,?)', [Description,taskDate,taskTime], 
        (tx, results) => {
            if(results.rowsAffected > 0)
            {
                Alert.alert(localizedString.txt_success,localizedString.txt_create_task,[
                    {text:localizedString.txt_ok},
                ])
            }
            else
            {
                Alert.alert('',localizedString.txt_failled,[
                    {text:localizedString.txt_ok},
                ])
            }
        });
        });
    }
    static clickOnDelete(id){
        Alert.alert(
            localizedString.txt_alert,localizedString.txt_delete_task_alert,
            [
                {text:localizedString.txt_yes,onPress:()=>{        
                    dbConnection().transaction(tx => {
                    tx.executeSql('DELETE FROM TaskList where TaskId=?', [id], 
                    (tx, results) => {
                        if(results.rowsAffected > 0)
                        {
                            Alert.alert(localizedString.txt_success,localizedString.txt_delete_task,[
                                {text:localizedString.txt_ok},
                            ]); 
                        }
                        else
                        {
                            Alert.alert('',localizedString.txt_failled,[{text:localizedString.txt_ok},])
                        }
                    });
                    });
                }},
                {text:localizedString.txt_no}, 
            ]
        );
    }
    static updateTaskData(TaskId,Description,taskDate,taskTime){
        dbConnection().transaction(tx => {
        tx.executeSql('UPDATE TaskList set Description=?,TaskDate=?,TaskTime=? where TaskId=?', [Description,taskDate,taskTime,TaskId], 
        (tx, results) => {
            if(results.rowsAffected > 0)
            {
                return Alert.alert(localizedString.txt_ok,localizedString.txt_update_task,[
                    {text:localizedString.txt_ok},
                ])
            }
            else
            {
                return Alert.alert('',localizedString.txt_failled,[
                    {text:localizedString.txt_ok},
                ])
            }
        });
        });
    }
}
function dbConnection()
    {
        return db = SQLite.openDatabase(
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
    }

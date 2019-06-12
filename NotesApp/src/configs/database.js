import React,{Component} from 'react';
import SQLite from "react-native-sqlite-storage";
import {Alert} from 'react-native';
import localizedString from '../configs/AllStrings'
import { Actions } from 'react-native-router-flux';
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
    static insertTaskData(Description,taskDate,taskTime,status)
    {
        dbConnection().transaction(tx => {
        tx.executeSql('INSERT INTO TASKLIST(Description,TaskDate,TaskTime,Status) values(?,?,?,?)', [Description,taskDate,taskTime,status], 
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
    static clickOnDelete = function(id){
        return new Promise(function (resolve, reject){
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
                                {text:localizedString.txt_ok, onPress: () => {return resolve(true)}},
                            ]); 
                        }
                        else
                        {
                            Alert.alert('',localizedString.txt_failled,[{text:localizedString.txt_ok, onPress:() => {return resolve(false)}}]);
                        }
                    });
                    });
                }},
                {text:localizedString.txt_no}, 
            ]
        );
    }).catch((error)=>{
        console.log(JSON.stringify(error));
    });
    }
    static updateTaskData(TaskId,Description,taskDate,taskTime,status){
        dbConnection().transaction(tx => {
        tx.executeSql('UPDATE TaskList set Description=?,TaskDate=?,TaskTime=?,Status=? where TaskId=?', [Description,taskDate,taskTime,status,TaskId], 
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

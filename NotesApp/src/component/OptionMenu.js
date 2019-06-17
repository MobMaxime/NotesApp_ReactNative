import React from 'react';
import {Image, AsyncStorage, StyleSheet} from 'react-native';
import {MENU_ICON} from '../configs/images';
import appcolors from '../configs/colors';
import globals from '../configs/globals';
import localizedString from '../configs/AllStrings';
import {Menu,MenuOptions,MenuOption,MenuTrigger} from 'react-native-popup-menu';
import { Actions } from 'react-native-router-flux';

changeTheme = (themeType) => {
    AsyncStorage.setItem(localizedString.txt_theme_type_key, themeType);
    appcolors.setTheme(themeType);
    Actions.reset(Actions.currentScene);
  };

const OptionMenu = ()=>{
    return(
        <Menu style={styles.menuMain}>
        <MenuTrigger><Image style={styles.imgMenu} source={MENU_ICON}/></MenuTrigger>
            <MenuOptions style={styles.menuContainer}>
                <MenuOption 
                    onSelect={()=>this.changeTheme(localizedString.txt_light_theme_type)}
                    customStyles={{optionWrapper:styles.optionContainer, optionText: [styles.menuText,{color:appcolors.ThemeColor}]}} 
                    text={localizedString.txt_light_theme} />
                <MenuOption 
                    onSelect={()=>this.changeTheme(localizedString.txt_dark_theme_type)}
                    customStyles={{optionWrapper:styles.optionContainer ,optionText: [styles.menuText,{color:appcolors.ThemeColor}]}} 
                    text={localizedString.txt_dark_theme} />
            </MenuOptions>
        </Menu>
    )
}

export default OptionMenu

const styles = StyleSheet.create({
    menuMain:{
        margin:5
    },
    imgMenu:{
        width:15,
        height:15,
        margin:10
    },
    menuContainer:{
        backgroundColor:appcolors.ThemeWhiteColor
    },
    menuText:{
        fontFamily:globals.FONT_APP,
        fontSize: 15
    },
    optionContainer:{
        padding:5,
        justifyContent:'center'
    }
});
import React from 'react';
import {Image} from 'react-native';
import {MENU_ICON} from '../configs/images';
import appcolors from '../configs/colors';
import globals from '../configs/globals';
import { Actions} from 'react-native-router-flux';
import localizedString from '../configs/AllStrings';
import taskList from '../screens/TaskList';

import {Menu,MenuOptions,MenuOption,MenuTrigger} from 'react-native-popup-menu';

const OptionMenu = ()=>{
    return(
        <Menu>
        <MenuTrigger><Image style={{width:15,height:15,margin:10}} source={MENU_ICON}/></MenuTrigger>
            <MenuOptions style={{backgroundColor:appcolors.ThemeColor}}>
                <MenuOption 
                    customStyles={{optionText: { color:appcolors.ThemeWhiteColor},fontFamily:globals.FONT_APP}} 
                    text={localizedString.txt_light_theme} />
                <MenuOption 
                    
                    customStyles={{optionText: { color:appcolors.ThemeWhiteColor},fontFamily:globals.FONT_APP}} 
                    text={localizedString.txt_dark_theme} />
            </MenuOptions>
        </Menu>
    )
}

export default OptionMenu
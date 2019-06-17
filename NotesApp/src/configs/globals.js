import {Platform, AsyncStorage} from 'react-native';
import appcolors from '../configs/colors';
import localizedString from '../configs/AllStrings';
import { Actions } from 'react-native-router-flux';

class Globals{
    static FONT_LATO_BOLD = Platform.OS === 'ios' ? 'Lato-Bold' : 'LatoBold';
    static FONT_LATO_ITALIC = Platform.OS === 'ios' ? 'Lato-Italic' : 'LatoItalic';
    static FONT_LATO_REGULAR = Platform.OS === 'ios' ? 'Lato-Regular' : 'LatoRegular';
    static FONT_LATO_BOLD_ITALIC = Platform.OS === 'ios' ? 'Lato-BoldItalic' : 'LatoBoldItalic';
    static FONT_APP = this.FONT_LATO_REGULAR;

    static setSelectedTheme(){
        AsyncStorage.getItem(localizedString.txt_theme_type_key).then(asyncStorageRes => {
            appcolors.setTheme(asyncStorageRes);
            Actions.refresh({entered:new Date()});
        });
    }
}
module.exports = Globals;
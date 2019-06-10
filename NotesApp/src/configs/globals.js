import {Platform} from 'react-native';
class Globals{
    
    static FONT_LATO_BOLD = Platform.OS === 'ios' ? 'Lato-Bold' : 'LatoBold';
    static FONT_LATO_ITALIC = Platform.OS === 'ios' ? 'Lato-Italic' : 'LatoItalic';
    static FONT_LATO_REGULAR = Platform.OS === 'ios' ? 'Lato-Regular' : 'LatoRegular';
    static FONT_LATO_BOLD_ITALIC = Platform.OS === 'ios' ? 'Lato-BoldItalic' : 'LatoBoldItalic';
    static FONT_APP = this.FONT_LATO_REGULAR;
}
module.exports = Globals;
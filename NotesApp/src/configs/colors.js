import ThemeManager from 'react-native-color-theme';

const appcolors = new ThemeManager({
  darkTheme: {
    ThemeDarkBlueColor:'#3700B3',
    ThemeDarkColor:'#FFFFFF',
    ThemeColor:'#8349EB',
    ThemeWhiteColor:'#FFFFFF',
    ThemeBackgroundColor:'#303030',
    ThemeLightGrayColor:'#d3d3d3'
  },
  lightTheme: {
    ThemeDarkBlueColor:'#3700B3',
    ThemeDarkColor:'#000000',
    ThemeColor:'#2150C4',
    ThemeWhiteColor:'#FFFFFF',
    ThemeBackgroundColor:'#fafafa',
    ThemeLightGrayColor:'#d3d3d3'
  }
});

export default appcolors
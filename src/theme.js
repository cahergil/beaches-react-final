import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    // primary: { 500: '#2196F3'},
    primary: {

      main: '#2196F3',
      dark: '#074c82'

    },
    secondary: {
      light: '#FABC3D',
      main: '#D4AC16',
      dark: '#976703'
    },
    text: {
      primary: '#000',
      secondary: '#D4AC16'

    }
  },
  typography: {
    htmlFontSize: 10,
    useNextVariants: true
  }
});
export default theme;
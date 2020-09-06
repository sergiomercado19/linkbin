import { makeStyles, createMuiTheme, fade } from '@material-ui/core/styles';
import { blue, grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    fontFamily: `'Russo One', sans-serif !important`,
    flexGrow: 1,
    minWidth: 100,
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(2),
  },
  appBar: {
    zIndex: 10,
  },
  logo: {
    backgroundColor: grey[300],
    padding: 4,
    marginRight: 20,
  },
  content: {
    flexGrow: 1,
  }
}));

export const darkTheme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1080,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    type: 'dark',
    primary: blue,
    secondary: grey,
  },
  typography: {
    fontFamily: `'Saira', sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  }
});
import { makeStyles, createMuiTheme, fade } from '@material-ui/core/styles';
import { blue, grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    fontFamily: `'Russo One', sans-serif !important`,
    flexGrow: 1,
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
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
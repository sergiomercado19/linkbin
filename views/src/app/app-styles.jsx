import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { blue, grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  background: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: darkTheme.palette.secondary.main,
    zIndex: -1,
  }
}));

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: grey,
  },
});

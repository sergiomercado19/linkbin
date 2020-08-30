import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { blue, grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    backgroundColor: darkTheme.palette.secondary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  boardSpace: {
    backgroundColor: darkTheme.palette.secondary.main,
    height: 'fit-content',
  },
  pinBoard: {
    paddingTop: 64,
    backgroundColor: darkTheme.palette.secondary.main,
  }
}));

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: grey,
  },
});

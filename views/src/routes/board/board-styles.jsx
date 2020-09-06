import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  boardSpace: {
    backgroundColor: theme.palette.secondary.main,
    height: 'fit-content',
    paddingTop: 128,
    paddingLeft: 64,
    paddingRight: 64,
    paddingBottom: theme.spacing(6) + 77,
  },
  title: {
    marginBottom: 45,
  },
  shareButton: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(6),
    zIndex: 2,
  }
}));

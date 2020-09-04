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
    paddingBottom: 100,
  },
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(6),
    right: theme.spacing(6),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

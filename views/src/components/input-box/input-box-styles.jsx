import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(6),
    left: 0 + theme.spacing(7) + 1,
    right: 0,
    height: 'fit-content',
    zIndex: 1,
  },
  footer: {
    alignItems: 'center',
    width: 'fit-content',
    position: 'relative',
    margin: 'auto',
    marginTop: 25,
    marginBottom: 4,
  },
  form: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    backgroundColor: theme.palette.secondary.dark,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

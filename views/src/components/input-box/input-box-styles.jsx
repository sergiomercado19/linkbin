import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 'fit-content',
    width: '100%',
    zIndex: 1,
  },
  footer: {
    alignItems: 'center',
    width: 'fit-content',
    position: 'relative',
    margin: 'auto',
    marginTop: 25,
    marginBottom: 25,
  },
  form: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 500,
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
  popup: {
    position: 'unset',
    transform: 'unset',
    marginBottom: 25,
  }
}));

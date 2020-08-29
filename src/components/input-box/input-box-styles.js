import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    height: 100,
    width: '100%',
    zIndex: 1,
    backgroundImage: 'linear-gradient(to bottom, rgba(31,31,31,0) 0%, rgba(31,31,31,1) 50%);',
  },
  form: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    position: 'relative',
    margin: 'auto',
    marginTop: 25,
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
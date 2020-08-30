import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    height: 100,
    width: '100%',
    zIndex: 1,
    backgroundImage: 'linear-gradient(to bottom, rgba(48,48,48,0) 0%, rgba(48,48,48,1) 60%);',
  },
  form: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 500,
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

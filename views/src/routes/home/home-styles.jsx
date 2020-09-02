import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    background: 'url("landing-banner.jpg")',
    height: '100vh',
    minHeight: 400,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
  },
  text: {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    padding: 50,
  },
  searchbox: {
    marginTop: 40,
    width: 400,
  }
}));

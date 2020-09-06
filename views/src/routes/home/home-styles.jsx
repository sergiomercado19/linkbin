import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    // background: 'url("landing-banner.jpg")',
    height: '100vh',
    minHeight: 400,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
  },
  showcase: {
    background: 'url("landing-banner.jpg")',
    backgroundSize: 'cover',
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontFamily: `'Russo One', sans-serif`,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    padding: 50,
  },
  searchbox: {
    marginTop: 40,
    width: 400,
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderRadius: 4,
  },
  content: {
    paddingTop: 40,
  }
}));

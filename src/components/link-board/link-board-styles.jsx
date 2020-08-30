import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 'fit-content',
    width: 'auto',
  },
  control: {
    padding: theme.spacing(2),
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  clickable: {
    cursor: 'pointer',
  },
  close: {
    padding: 4,
    marginRight: 12,
  }
}));

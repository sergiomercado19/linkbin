import { makeStyles } from '@material-ui/core/styles';

const drawerWidthOpen = 180;
const drawerWidthClosed = 60;

export const useStyles = makeStyles((theme) => ({
  drawerOpened: {
    width: drawerWidthOpen,
    flexShrink: 0,
    zIndex: 9,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClosed: {
    width: drawerWidthClosed,
    flexShrink: 0,
    zIndex: 9,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerPaper: {
    width: 'inherit',
  },
  drawerContainer: {
    overflow: 'auto',
    overflowX: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  spacer: {
    flexGrow: 1,
  },
}));

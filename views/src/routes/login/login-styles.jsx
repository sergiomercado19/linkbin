import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
		marginTop: theme.spacing(25),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	progess: {
		position: 'absolute'
	}
}));

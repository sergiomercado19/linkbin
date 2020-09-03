import React, { useState } from 'react';
import { useStyles } from './login-styles';
import { Link, Redirect } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LinkStyle from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import apiClient from '../../utils/apiClient';

function Login() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);

	const handleCloseError = () => {
		setErrorOpen(false);
	};

  const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		apiClient.login(email, password)
			.then((res) => {
				switch (res.status) {
          case 200:
            localStorage.setItem('AuthToken', `Bearer ${res.data.token}`);
						setLoggedIn(true);
            break;
          case 400:
            // Invalid form
          case 403:
            // Wrong credentials
          default:
						setErrors(res.data.errors);
						setErrorOpen(true);
            break;
        };
			})
			.catch((error) => {
				console.log(error);			
				// setErrors(error.response.data);
			});
		setLoading(false);
	};

  const classes = useStyles();

	if (isLoggedIn || localStorage.getItem('AuthToken')) {
		return <Redirect to="/" />
	} else {
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Login
					</Typography>
					<form className={classes.form}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label="Email Address"
							type="email"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={(e) => setEmail(e.target.value)}
							error={email !== '' && !isEmail(email)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							autoComplete="current-password"
							onChange={(e) => setPassword(e.target.value)}
							error={password !== '' && isEmpty(password)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleSubmit}
							disabled={loading || !email || !password}
						>
							Log In
							{loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
						<Grid container>
							<Grid item>
								<Link to="/signup" variant="body2" component={LinkStyle}>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
					<Snackbar open={isErrorOpen} autoHideDuration={5000} onClose={handleCloseError}>
						<MuiAlert elevation={6} variant="filled" onClose={handleCloseError} severity="error" >
							{errors.map((error) => (
								<Typography key={error}>
									{error}
								</Typography>
							))}
						</MuiAlert>
					</Snackbar>
				</div>
			</Container>
		);
	}
}

export default Login;
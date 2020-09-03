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
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import apiClient from '../../utils/apiClient';

function Login() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		apiClient.login(email, password)
			.then((res) => {
				localStorage.setItem('AuthToken', `Bearer ${res.data.token}`);
				setIsLoggedIn(true);
			})
			.catch((error) => {
				console.log(error);			
				setErrors(error.response.data);
			});
		setLoading(false);
	};

  const classes = useStyles();

	if (isLoggedIn && localStorage.getItem('AuthToken')) {
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
							helperText="Invalid email"
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
							helperText="Invalid password"
							error={password !== '' && isEmpty(password)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleSubmit}
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
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
					</form>
				</div>
			</Container>
		);
	}
}

export default Login;

import React, { useState } from 'react';
import { useStyles } from './signup-styles';
import { Link, Redirect } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LinkStyle from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import SignupIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import apiClient from '../../utils/apiClient';
import { startSession, getSession } from '../../utils/session';

function Signup() {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isErrorOpen, setErrorOpen] = useState(false);
	
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleCloseError = () => {
		setErrorOpen(false);
	};

  const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		const form = {
			firstName, lastName, email,
			password, confirmPassword
		}
		apiClient.signup(form)
			.then((res) => {
				switch (res.status) {
          case 201:
            startSession(res.data.token);
            break;
          default:
						setErrors(res.data.errors);
						setErrorOpen(true);
            break;
				};
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);			
				// setErrors(error.response.data);
				setLoading(false);
			});
	};

  const classes = useStyles();

	if (getSession()) {
		return <Redirect to="/" />
	} else {
		return (
			<Container component="main" maxWidth="xs">
				{/* Loading */}
        {isLoading && <div className="spinner-base"><div className="spinner" /></div>}

				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<SignupIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign Up
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							{/* First name */}
							<Grid item xs={12} sm={6}>
								<TextField variant="outlined" fullWidth required
									type="text" name="firstName" autoComplete="firstName" label="First Name"
									onChange={(e) => setFirstName(e.target.value)}
									error={firstName !== '' && isEmpty(firstName)}
								/>
							</Grid>

							{/* Last name */}
							<Grid item xs={12} sm={6}>
								<TextField variant="outlined" fullWidth required
									type="text" name="lastName" autoComplete="lastName" label="Last Name"
									onChange={(e) => setLastName(e.target.value)}
									error={lastName !== '' && isEmpty(lastName)}
								/>
							</Grid>

							{/* Email */}
							<Grid item xs={12}>
								<TextField variant="outlined" fullWidth required
									type="email" name="email" autoComplete="email" label="Email Address"
									onChange={(e) => setEmail(e.target.value)}
									error={email !== '' && !isEmail(email)}
								/>
							</Grid>

							{/* Password */}
							<Grid item xs={12}>
								<TextField variant="outlined" fullWidth required
									type="password" name="password" autoComplete="password" label="Password"
									onChange={(e) => setPassword(e.target.value)}
									error={password !== '' && isEmpty(password)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField variant="outlined" fullWidth required
									type="password" name="confirmPassword" autoComplete="password2" label="Confirm Password"
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</Grid>
						</Grid>
						<Button variant="contained" type="submit" color="primary" fullWidth
							className={classes.submit}
							onClick={handleSubmit}
							disabled={isLoading || !firstName || !lastName || !email || !password || !confirmPassword}
						>
							Sign Up
							{isLoading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link to="/login" variant="body2" component={LinkStyle}>
									{"Already have an account? Sign in"}
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

export default Signup;

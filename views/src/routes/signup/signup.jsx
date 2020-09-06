import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import { useStyles } from './signup-styles';
import {
  Avatar, Button, CssBaseline, TextField, Grid, Typography,
  Container, CircularProgress, Snackbar, Link as LinkStyle
} from '@material-ui/core';
import {
  PersonAddOutlined as SignupIcon
} from '@material-ui/icons';
import {
  Alert
} from '@material-ui/lab';

import apiClient from 'utils/apiClient';
import { startSession, getSession } from 'utils/session';

function Signup() {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isErrorOpen, setErrorOpen] = useState(false);
  
  // Form data
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
            startSession(res.data.token, res.data.email);
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

  if (getSession.token()) {
    // Make this page unviewable when logged in
    return <Redirect to="/me/boards" />
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SignupIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          {/* Form */}
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

            {/* Tail */}
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2" component={LinkStyle}>
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </form>

          {/* Error message popup */}
          <Snackbar open={isErrorOpen} autoHideDuration={5000} onClose={handleCloseError}>
            <Alert elevation={6} variant="filled" onClose={handleCloseError} severity="error" >
              {errors.map((error) => (
                <Typography key={error}>
                  {error}
                </Typography>
              ))}
            </Alert>
          </Snackbar>
        </div>
      </Container>
    );
  }
}

export default Signup;

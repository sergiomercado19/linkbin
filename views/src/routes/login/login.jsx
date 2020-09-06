import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import { useStyles } from './login-styles';
import {
  Avatar, Button, CssBaseline, TextField, Typography, Grid,
  Container, CircularProgress, Snackbar, Link as LinkStyle
} from '@material-ui/core';
import {
  LockOutlined as LockOutlinedIcon 
} from '@material-ui/icons';
import {
  Alert
} from '@material-ui/lab';

import apiClient from '../../utils/apiClient';
import { startSession, getSession } from '../../utils/session';

function Login() {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isErrorOpen, setErrorOpen] = useState(false);
  
  // Form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        {/* Loading */}
        {isLoading && <div className="spinner-base"><div className="spinner" /></div>}

        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>

          {/* Form */}
          <form className={classes.form} noValidate>
            {/* Email */}
            <TextField variant="outlined" margin="normal" fullWidth required autoFocus
              type="email" name="email" autoComplete="email" label="Email Address" 
              onChange={(e) => setEmail(e.target.value)}
              error={email !== '' && !isEmail(email)}
            />

            {/* Password */}
            <TextField variant="outlined" margin="normal" fullWidth required
              type="password" name="password" autoComplete="password" label="Password"
              onChange={(e) => setPassword(e.target.value)}
              error={password !== '' && isEmpty(password)}
            />

            <Button variant="contained" type="submit" color="primary" fullWidth
              className={classes.submit}
              onClick={handleSubmit}
              disabled={isLoading || !email || !password}
            >
              Log In
              {isLoading && <CircularProgress size={30} className={classes.progess} />}
            </Button>

            {/* Tail */}
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2" component={LinkStyle}>
                  {"Don't have an account? Sign Up"}
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

export default Login;

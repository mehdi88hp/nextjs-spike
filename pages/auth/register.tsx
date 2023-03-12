import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import validator from '../../lib/validations'
import formValidation, { stateType } from '../../lib/useFormValidation';
import { useState } from "react";
import axios from "axios";
import getConfig from 'next/config'
import Router from "next/router";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const {serverRuntimeConfig, publicRuntimeConfig} = getConfig()

const theme = createTheme();

export default function SignUp() {

  const {handleInput, handleHelperText, handleBlur, setForm, form} = formValidation({
    firstName: {
      validations() {
        return [
          validator.required(this.value) ? null : 'this field is required',
          validator.minLength(this.value, 3) ? null : 'minimum length is 3',
        ]
      }
    },
    lastName: {
      validations() {
        return [
          validator.required(this.value) ? null : 'this field is required',
          validator.minLength(this.value, 3) ? null : 'minimum length is 3',
        ]
      },
    },
    email: {
      validations() {
        return [
          validator.required(this.value) ? null : 'this field is required',
          validator.email(this.value) ? null : 'email is invalid',
        ]
      },
    },
    password: {
      validations() {
        return [
          validator.required(this.value) ? null : 'this field is required',
          validator.minLength(this.value, 3) ? null : 'minimum length is 3',
        ]
      },
    },
  } as Record<string, stateType>);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data, {
      firstName: data.get('email'),
      lastName: data.get('password'),
      email: data.get('password'),
      password: data.get('password'),
    });
    console.log(getConfig().publicRuntimeConfig.authApi + '/users/signup');

    axios.post(getConfig().publicRuntimeConfig.authApi + '/users/signup', {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    }).then(response => {
      console.log(response)
      if (response.data.status === true) {
        Router.push({
          pathname: '/auth/login',
          // query: { name: 'Someone' }
        })
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  onBlur={event => handleBlur(event, 'firstName')}
                  onInput={event => handleInput(event, 'firstName')}
                  error={form.firstName.showError}
                  helperText={form.firstName.showError ? handleHelperText('firstName') : false}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  onBlur={event => handleBlur(event, 'lastName')}
                  onInput={event => handleInput(event, 'lastName')}
                  error={form.lastName.showError}
                  helperText={form.lastName.showError ? handleHelperText('lastName') : false}
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onBlur={event => handleBlur(event, 'email')}
                  onInput={event => handleInput(event, 'email')}
                  error={form.email.showError}
                  helperText={form.email.showError ? handleHelperText('email') : false}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  onBlur={event => handleBlur(event, 'password')}
                  onInput={event => handleInput(event, 'password')}
                  error={form.password.showError}
                  helperText={form.password.showError ? handleHelperText('password') : false}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/*<Grid item xs={12}>*/}
              {/*  <FormControlLabel*/}
              {/*    control={<Checkbox value="allowExtraEmails" color="primary"/>}*/}
              {/*    label="I want to receive inspiration, marketing promotions and updates via email."*/}
              {/*  />*/}
              {/*</Grid>*/}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              disabled={Object.values(form).map(item => item.hasError).filter(Boolean).length > 0}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={'/auth/login'} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{mt: 5}}/>
      </Container>
    </ThemeProvider>
  );
}
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
import formValidation, { stateType } from '../../lib/useFormValidation';
import validator from "../../lib/validations";
import axios from "axios";
import getConfig from 'next/config'
import { useDispatch, useSelector } from "react-redux";


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

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();

  const {handleSubmit, handleInput, handleHelperText, handleBlur, setForm, form} = formValidation({
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
    } as Record<string, stateType>,
    {endpoint: '/users/signin'}
  );

  function handleLogin(event) {

    event.preventDefault()

    console.log('getConfig().publicRuntimeConfig.authApi', getConfig().publicRuntimeConfig.authApi)

    axios.post(getConfig().publicRuntimeConfig.authApi + '/users/jwtSignIn', {
      email: form.email.value,
      password: form.password.value,
    }).then(async response => {
      localStorage.setItem('jwt', response.data.access_token);

      const slice = await import('../../store/auth/authSlice')

      dispatch(slice.setUser(response.data.user))

    }).catch(err => console.log(err))
  }

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              onBlur={event => handleBlur(event, 'email')}
              onInput={event => handleInput(event, 'email')}
              error={form.email.showError}
              helperText={form.email.showError ? handleHelperText('email') : false}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              onBlur={event => handleBlur(event, 'password')}
              onInput={event => handleInput(event, 'password')}
              error={form.password.showError}
              helperText={form.password.showError ? handleHelperText('password') : false}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary"/>}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={Object.values(form).map(item => item.hasError).filter(Boolean).length > 0}
              onClick={event => handleLogin}
              sx={{mt: 3, mb: 2}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{mt: 8, mb: 4}}/>
      </Container>
    </ThemeProvider>
  );
}
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import validator from '../../lib/validations'
import formValidation, { stateType } from '../../lib/useFormValidation';
import { useState } from "react";
import axios from "axios";
import getConfig from 'next/config'
import Router from "next/router";
import { useAuthOnFront } from "../../lib/useAuthOnFront";
import { wrapper } from "../../store";
import { GetServerSidePropsCallback } from "next-redux-wrapper";
import { fetchUserByJwt, setUser } from "../../store/auth/authSlice";
import useUser from "../../lib/useUser";
import { useDispatch } from "react-redux";


const {serverRuntimeConfig, publicRuntimeConfig} = getConfig()

export default function Profile(props) {
  console.log(props.user)
  const dispatch = useDispatch();

  dispatch(setUser(props.user))

  const userState = useAuthOnFront();

// if(!userState){
//   return <></>
// }

  const {handleInput, handleHelperText, handleBlur, setForm, form, triggerErrors} = formValidation({
    firstName: {
      value: userState ? userState.firstName : '',
      validations() {
        return [
          validator.required(this.value) ? null : 'this field is required',
          validator.minLength(this.value, 3) ? null : 'minimum length is 3',
        ]
      }
    },
    lastName: {
      value: userState ? userState.lastName : '',
      validations() {
        return [
          validator.required(this.value) ? null : 'this field is required',
          validator.minLength(this.value, 3) ? null : 'minimum length is 3',
        ]
      },
    },
    age: {
      value: userState ? userState.age : '',
      validations() {
        return [
          validator.required(this.value) ? null : 'this field is required',
          validator.isInteger(this.value) ? null : ' this field needs to be a number',
        ]
      }
    },
    country: {
      value: userState ? userState.country : '',
      validations() {
        return [
          validator.required(this.value) ? null : 'this field is required',
          validator.minLength(this.value, 3) ? null : 'minimum length is 2',
        ]
      },
    },
    email: {
      value: userState ? userState.email : '',
      validations() {
        return [
          validator.required(this.value) ? null : 'this field is required',
          validator.email(this.value) ? null : 'email is invalid',
        ]
      },
    },

  } as Record<string, stateType>);


  // if(userState)
  // for (let key in form) {
  //   setForm({...form, [key]: userState[key]})

  // form[key].value = userState ? userState[key] : ''
  // }

  // console.log(Array.from(userState))

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data, {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      country: data.get('country'),
      age: data.get('age'),
      email: data.get('email'),
    });
    console.log(getConfig().publicRuntimeConfig.authApi + '/users/profile');

    const config: Record<string, any> = {}

    config.headers = {
      // Cookie: `passport_cookie=${passport_cookie};`
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }

    axios.post(getConfig().publicRuntimeConfig.authApi + '/users/setProfile', {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      country: data.get('country'),
      age: data.get('age'),
      email: data.get('email'),
    }, config).then(response => {
      console.log(response)
      if (response.data.status === true) {
        alert('ok')
      }
    });
  };

  React.useEffect(() => {
    triggerErrors(form)
  }, []);

  return (
    // <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xl">
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
          <PersonIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Save profile
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                defaultValue={form.firstName.value}
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
                defaultValue={form.lastName.value}
                onBlur={event => handleBlur(event, 'lastName')}
                onInput={event => handleInput(event, 'lastName')}
                error={form.lastName.showError}
                helperText={form.lastName.showError ? handleHelperText('lastName') : false}
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="age"
                name="age"
                required
                fullWidth
                defaultValue={form.age.value}
                onBlur={event => handleBlur(event, 'age')}
                onInput={event => handleInput(event, 'age')}
                error={form.age.showError}
                helperText={form.age.showError ? handleHelperText('age') : false}
                id="age"
                label="age"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="country"
                value={form.country.value}
                onBlur={event => handleBlur(event, 'country')}
                onInput={event => handleInput(event, 'country')}
                error={form.country.showError}
                helperText={form.country.showError ? handleHelperText('country') : false}
                label="country"
                name="country"
                autoComplete="country"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                defaultValue={form.email.value}
                onBlur={event => handleBlur(event, 'email')}
                onChange={event => handleInput(event, 'email')}
                error={form.email.showError}
                helperText={form.email.showError ? handleHelperText('email') : false}
                name="email"
                autoComplete="email"
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
            Save
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={'/auth/login'} passHref>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    // </ThemeProvider>
  );
}

//
// export async function getServerSideProps({req, res}) {
//   // Fetch data from external API
//   console.log(req)
//   console.log('salaaaaaaaaaaaaaaaaam im in useAuthOnFront')
//
//   const dispatch = useDispatch();
//
//   const loadedUser = useSelector(state => state.auth.user);
//
//   if (!loadedUser) {
//     dispatch(fetchUserByJwt())
//   }
//
//   return {
//     props: {}
//   }

export const getServerSideProps = wrapper.getServerSideProps((store => async ({req, res, ...etc}) => {
  const response = await useUser({req}).catch(err => console.log(err))

  if (!response) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }
  const user = response.user
  return {
    props: {
      user
    }
  }
  store.dispatch(fetchUserByJwt({req}));
}) as GetServerSidePropsCallback<any, any>);

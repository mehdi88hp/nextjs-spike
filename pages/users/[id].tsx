import { useDispatch } from "react-redux";
import { fetchUserByJwt, setUser } from "store/auth/authSlice";
import { useAuthOnFront } from "lib/useAuthOnFront";
import formValidation, { stateType } from "lib/useFormValidation";
import validator from "lib/validations";
import * as React from "react";
import getConfig from "next/config";
import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { wrapper } from "store";
import useUser from "lib/useUser";
import { GetServerSidePropsCallback } from "next-redux-wrapper";
import Autocomplete from '@mui/material/Autocomplete';

export default function UserDetail(props) {
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
          validator.isInteger(this.value) ? null : 'this field needs to be a number2',
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

    axios.post(getConfig().publicRuntimeConfig.authApi + '/users/setUserDetail', {
      userId: props.user._id,
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

  const [permissions, setPermissions] = React.useState<any>(['s', 'v']);
  const [permissionValueState, setPermissionValueState] = React.useState<any>(null);
  const [permissionsValue, setPermissionsValue] = React.useState('');

  React.useEffect(() => {
    console.log(value, 'xxx')
    setTimeout(() => {
      console.log('setTimeout')// setPermissionsValue(newInputValue);

      setPermissions(permissions.map(item => item + ' ' + permissionsValue))

      // setOptions(newValue ? [newValue, ...options] : options);
      // console.log(top100Films)
    }, 500)
  }, [value, permissionsValue]);

  let top100Films = ['s', 'v']
  return (
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
            <Grid item xs={12} sm={12}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={permissions}
                filterOptions={(x) => x}
                noOptionsText="No Result"
                value={permissionValueState}
                onChange={(event: any, newValue) => {
                  setPermissions(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                  setPermissionsValue(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Permissions"/>}
              />
            </Grid>
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
        </Box>
      </Box>
    </Container>
    // </ThemeProvider>
  );
}
export const getServerSideProps = wrapper.getServerSideProps((store => async ({req, res, ...etc}) => {
  const config: AxiosRequestConfig = {}

  config.headers = {
    Cookie: req.headers.cookie

    // Cookie: `passport_cookie=${passport_cookie};`
  } as AxiosHeaders

  const data = await axios.get(getConfig().publicRuntimeConfig.authApi + '/users/' + etc.query.id, config).then(response => {
    return response.data
  }).catch(e => {
  });

  console.log('datadatadata', data)
  return {
    props: {
      user: data
    }
  }
}) as GetServerSidePropsCallback<any, any>);
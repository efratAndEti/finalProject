// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// //import './SignUp.css';

// export default function SignUp() {

//     const [from_m, setFrom_m] = useState('');
//     const [to_m, setTo_m] = useState('');


//     const SignUp = () => {
//         const body = {
//             from_m, 
//             to_m
//         }
//         console.log("adding the massage", body);
//         axios.post('http://localhost:8080/addMassage', body).then((res) => {
//             console.log(res);
//         })
//     }

//     return (
//         <div>
//             <form >
//                 <input value={from_m} onChange={(e) => { setFrom_m(e.target.value) }} />
//                 <input value={to_m} onChange={(e) => { setTo_m(e.target.value) }} />
//                 <input type="button" onClick={SignUp} value="send massage" />
//             </form>
//         </div>
//     )
// }
import * as React from 'react';
import axios from 'axios';
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
import ControlledRadioButtonsGroup from './RadioButton';
import { AddBusinessRounded } from '@mui/icons-material';
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route
//   } from "react-router-dom";
// import LogIn from '../LogIn/LogIn';

function Copyright(props) {
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

export default function SignUp() {

  const [firstName,setFirstName]=React.useState('');
  const [lastName,setLastName]=React.useState('');
  const [password,setPassword]=React.useState('');
  const [email,setEmail]=React.useState('');
  const [kind,setKind]=React.useState(1);

  const AddUser= ()=> {
     const body={
      email, password, kind ,lastName,firstName  
     }
      axios.post('http://localhost:8080/addUser', body).then((res) => {
            console.log(res);
        })
     console.log(body);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value) }}
                  autoComplete="given-name"
                  name="firstName"
                  required="true"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value) }}
                  required="true"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                  required="true"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  requiredrequired="true"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              <Grid>
                <ControlledRadioButtonsGroup />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={AddUser}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                  {/* <Router> */}
                <Link  href="http://localhost:3000/log-in" variant="body2">
                  Already have an account? Sign in
                </Link>
                {/* <Routers>
                     <Route path="/sign-in" element={<LogIn/>} />
                     </Routers> */}
          {/* //<Routes/> */}
                {/* </Router> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
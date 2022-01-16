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
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, Radio, RadioGroup } from '@mui/material';
import { wait } from '@testing-library/react';


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

export default function SignUp(props) {
  const { onSignUp } = props;
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [kind, setKind] = React.useState();
  const [disabled, setDisabled] = React.useState(true);


  const handleChange = (event) => {
    if (event.target.value == 'client')
      setKind(1);
    else
      setKind(0);
    ifCanged();

  };

  const AddUser = () => {
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const body = {
      email, password, kind, lastName, firstName,date
    }
    axios.post('http://localhost:8080/addUser', body).then((res) => {
      console.log(res);
      body.id = res.data.insertId;
      console.log(body);
      const userStr = JSON.stringify(body);
      localStorage.setItem("user", userStr);
      console.log(body);
      onSignUp();
      sendTo();

    })

  }

  const ifCanged = () => {
    if(error==false )
    if (email && password && lastName && firstName ) {
      console.log("disabled:false");
      setDisabled(false);
    }
  }

  const sendTo = () => {
    if (kind)
      window.location.assign('http://localhost:3000/client-bar');
    else
      window.location.assign('http://localhost:3000/employee-form');
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
  const [error,setError]=React.useState('');

  const handleEmail=(e)=>{
    const re=/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (re.test((e.target.value)))
      setError('');
    else
    setError('אנא הכנס מייל תקין');
      setEmail(e.target.value);
  }

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
                  onChange={(e) => { setFirstName(e.target.value); ifCanged() }}
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
                  onChange={(e) => { setLastName(e.target.value); ifCanged() }}
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
                error={error}
                helperText={error}
                  value={email}
                  onChange={(e) => { handleEmail(e); ifCanged() }}
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
                  onChange={(e) => { setPassword(e.target.value); ifCanged() }}
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
                <FormControl component="fieldset">
                  {/* <FormLabel component="legend">סוג</FormLabel> */}
                  <RadioGroup
                    aria-label="kind"
                    name="controlled-radio-buttons-group"
                    value={kind}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="client" control={<Radio />} label="מטופל" />
                    <FormControlLabel value="employee" control={<Radio />} label="עובד" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={AddUser}
              disabled={disabled}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* <Router> */}
                <Link href="http://localhost:3000/log-in" variant="body2">
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
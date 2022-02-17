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
import { loginUser } from '../../services/user.service';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

function Copyright(props) {

  const routeChange = () => {
    let path = `src/components/SignUp/SignUp.js`;
    window.location.assign(path);
  }

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

export default function LogIn(props) {
  const { onLogin } = props;
  // const [users, setUsers] = React.useState([]);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [user, setUser] = React.useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // handleClick();

    // const data = new FormData(event.currentTarget);
    // // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

    const result = await loginUser(userName, password);
    if (result.success == true) {
      alert("success");
      console.log("user: ", result.user);
      setUser(result.user);
      //שמירה ללוקל סטורג'
      const userStr = JSON.stringify(result.user);
      localStorage.setItem("user", userStr);
      //עדכון התפריט
      onLogin();
      //מעבר לקומפוננטה
      sendTo();
    }
    else {
      alert("not success");
      setOpen(true);
      console.log("failed: ", result.massage);
    }

  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const sendTo = () => {
    //לאן להעביר את המשתמש?
    const u = JSON.parse(localStorage.getItem("user"));
    if (u.user_kind == 0) {
      //אם הסוג של המשתמש עובד
      //שליפת פרטי עובד
      // אם קיים - עובר ללוח
      //אם לא - עובר לטופס פרטים
      axios.get(`http://localhost:8080/getEmployeeByUserId/${u.id}`).then((res) => {
        const empDetails = res.data;
        if (empDetails == "") {
          alert("עליך למלא טופס רישום");

          //   <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          //   <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          //     This is a success message!
          //   </Alert>
          // </Snackbar>
          window.location.assign('http://localhost:3000/employee-form');
        }
        else {
          alert("זוהית בהצלחה");
          localStorage.setItem("employee", JSON.stringify(empDetails))
          window.location.assign('http://localhost:3000/employee-bar');
        }

      });
    }
    else if(u.user_kind==1) {
      //אם הסוג של המשתמש מעביד
      //שליפת פרטי מעביד
      // אם קיים - עובר ללוח
      //אם לא - עובר לטופס פרטים
      axios.get(`http://localhost:8080/getClientByUserId/${u.id}`).then((res) => {
        const clientDetails = res.data;
        if (clientDetails == "") {
          alert("עליך למלא טופס רישום")
          window.location.assign('http://localhost:3000/client-form');
        }
        else {
          alert("זוהית בהצלחה");
          localStorage.setItem("client", JSON.stringify(clientDetails))
          window.location.assign('http://localhost:3000/client-bar');
        }
      });
    }
    else if(u.user_kind==2)
    {
      window.location.assign('http://localhost:3000/manager-bar');
    }
  }

  // React.useEffect(async () => {
  //   console.log("getting data from server");

  //   const users = await getUsers();
  //   console.log(users);
  //   if (users != null) {
  //     console.log(users);
  //     setUsers(users);
  //   } else
  //     alert("server Errror! , client");
  // }, [])
  // const findUser = () => {
  //   console.log(users);
  //   const result = users.filter(e => e.user_name == userName);
  //   alert(result);
  // }
  const [error, setError] = React.useState('');

  const handleEmail = (e) => {
    const re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (re.test((e.target.value)))
      setError('');
    else
      setError('אנא הכנס מייל תקין');
    setUserName(e.target.value);
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              value={userName}
              onChange={(e) => { handleEmail(e) }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            // type="email"
            // required
            />
            <TextField
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Snackbar open={open}>
              <Alert severity="error">שם משתמש או סיסמא שגויים</Alert>
            </Snackbar>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              // onClick={findUser}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
                <Link href="http://localhost:3000/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
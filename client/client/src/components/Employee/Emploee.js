import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import SignOut from '../SignOut/SignOut';
import OpinionEmp from '../OpinionEmp/opinionEmp';
import { Alert, Snackbar, Tooltip } from '@mui/material';
import EmployeePage from '../UserPages/EmployeePage';
import MyMassagesPage from '../MyChat/MyMassagesPage';
import UpdatePages from '../UpdateEmp/UpdatePage';
import Preference from '../Preference/preference';
import UpdateStatus from '../UpdateEmp/UpdateStatus';
import UpdatePreference from '../UpdateEmp/UpdatePreference';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import UpdateDetails from '../UpdateEmp/UpdateDetails';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function EmployeeBar() {

  const [emp, setEmp] = React.useState(null);

  React.useEffect(() => {
    const e = JSON.parse(localStorage.getItem("employee"));
    setEmp(e);
  }, [])


  // let { path, url } = useMatch();
  // console.log("path: ", path);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [status, setStatus] = React.useState();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleStatusChanged = (val) => {
    setStatus(val);
    const status=val
    const id = emp.emp_id;
    axios.put(`http://localhost:8080/UpdateEmpStatus/${id}/${status}`).then((res) => {
      console.log(res);
    })
    handleClick();
    setTimeout(function(){
      window.location.assign(`/employee-bar/`)
   }, 3000);
    //שינוי סטטוס ושליחת הודעה ללקוח אם מאשר את השינוי, אם כן משנה גם ללקוח, אפ לא משנה רק לעובד
    // const emploeeId
    //איך מעבירים משהו מהבן לאבא
  };
  // const sendMassage=()=>{
  //   const obj = {
  //     from_m: {
  //         id: client.id_client,
  //         first_name: client.first_name,
  //         last_name: client.last_name
  //     },
  //     to_m: {
  //         id: selectedEmp.emp_id,
  //         first_name: selectedEmp.first_name,
  //         last_name: selectedEmp.last_name
  //     },
  //     kind: "startTry"
  // }
  // axios.post("http://localhost:8080/addSystemMassage", obj).then((res) => {
  //     alert("הודעה על הזמנה לראיון נשלחה ללקוח")
  // })
  // }

  const signout = () => {

    handleMenuClose();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      <MenuItem onClick={handleMenuClose}> {emp ? emp.firstName : ""} {emp ? emp.lastName : ""}</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}><SignOut /></MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (

    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: '#006064' }}>
          <Toolbar>

            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Emploee
            </Typography> */}
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Tooltip title="חוות דעת">
                <IconButton size="large" aria-label="opinion" color="inherit"
                  onClick={(e) => { window.location.assign(`/employee-bar/opinion`) }}>
                  <InsertEmoticonIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="התראות">
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title='דואר'>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit"
                  onClick={(e) => { window.location.assign(`/employee-bar/massages`) }}>
                  <Badge badgeContent={8} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title='פרופיל'>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Tooltip title='בית'>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit"
                  onClick={(e) => { window.location.assign(`/employee-bar/`) }}>
                  <HomeIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            הסטטוס שונה בהצלחה
          </Alert>
        </Snackbar>

      </Box>

      <Routes>
        <Route path={`opinion`} element={<OpinionEmp />} />
        <Route path={`preference`} element={<Preference />} />
        <Route path={`update-preference`} element={<UpdatePreference />} />
        <Route path={`update-details`} element={<UpdateDetails />} />
        <Route path={`update`} element={<UpdatePages />} />
        <Route path={`update-status`} element={<UpdateStatus onChangeStatus={handleStatusChanged} />} />
        <Route path={`massages`} element={< MyMassagesPage id={emp ? emp.emp_id : 0} />} />
        <Route path={``} element={<EmployeePage />} />

      </Routes>
    </>
  );
}

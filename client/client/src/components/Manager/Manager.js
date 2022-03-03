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
import Massage from '../Chats/Massage';
import OpinionEmp from '../OpinionEmp/opinionEmp';
import { FormControlLabel, Radio, RadioGroup, Tooltip } from '@mui/material';
import EmployeePage from '../UserPages/EmployeePage';
import ManagerPage from '../UserPages/ManagerPage';
import ManagerOpinion from './ManagerOpinoin';
import EmploeeView from './employeeView';
import ClientView from './clientView';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Statistics from '../Statistics/Statics';
import EmpStatistic from '../Statistics/EmpStatistic';

const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});
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

export default function ManagerBar() {
  const userStr = localStorage.getItem("user");
  const user = JSON.parse(userStr);

  // let { path, url } = useMatch();
  // console.log("path: ", path);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [field, setField] = React.useState(null);
  const [valueSearch, setValueSearch] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

      <MenuItem onClick={handleMenuClose}> פרופיל המנהל</MenuItem>
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
  const sendSearch = (e) => {
    debugger
    if (e.target.value == 'all') {
      setField(null);
      setValueSearch(null);
    }
    else
      setField(e.target.value)
  }
  const changeSearch = (e) => {
    if (field == 'all')
      setValueSearch(null)
    else
      setValueSearch(e.target.value)
  }

  const styles = theme => ({
    radio: {
      '&$checked': {
        color: '#4B8DF8'
      }
    },
    checked: {}
  })
  return (

    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: '#006064' }}>
          <Toolbar>
            {window.location.pathname.includes('view')  &&
              <>
                
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      dir='rtl'
                      placeholder="חפש..."
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={changeSearch}
                    />
                  </Search>
                 
                  <CacheProvider value={cacheRtl}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      onChange={sendSearch}
                      defaultChecked="all"
                      style={{color:'white'}}
                    >
                      <FormControlLabel  dir='rtl' value="city" control={<Radio />} label="עיר" />
                      <FormControlLabel dir='rtl' value="last_name" control={<Radio />} label="שם משפחה" />
                      <FormControlLabel dir='rtl' value="first_name" control={<Radio />} label="שם פרטי" />
                      <FormControlLabel dir='rtl' value="phone" control={<Radio />} label="טלפון" />
                      <FormControlLabel dir='rtl' value="all" control={<Radio />} label="הצג הכל" />
                    </RadioGroup>
                  </CacheProvider>
                </>
              }

                <Box sx={{ flexGrow: 1 }} />
                {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
          </Box> */}
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
      </Box>

      <Routes>
        <Route path={`opinion`} element={<ManagerOpinion />} />
        <Route path={`employee-view`} element={<EmploeeView valueSearch={valueSearch} field={field} />} />
        <Route path={`client-view`} element={<ClientView valueSearch={valueSearch} field={field}/>} />
        <Route path={`statistics`} element={<Statistics/>} />
        <Route path={`emp-statistic`} element={<EmpStatistic/>} />
        <Route path={``} element={<ManagerPage />} />


      </Routes>
    </>
  );
}

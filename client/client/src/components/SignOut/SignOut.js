import { Button, MenuItem } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { ThemeProvider } from '@mui/styles';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignOut(props) {
    const {onSignOut}=props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = () => {
      onSignOut();
      localStorage.clear();
      setOpen(false);
      window.location.assign('http://localhost:3000/');
  };
  const whiteTheme = createTheme({ palette: { primary:{ main:grey[50] }} })


  return (
    <div>
        <ThemeProvider theme={whiteTheme}>
      <Button variant="outlined" onClick={handleClickOpen} color="primary" style={{ color: '#0097a7' }} >
        Sign Out
      </Button>
      </ThemeProvider>
      {/* <MenuItem onClick={handleClickOpen}>Sign Out</MenuItem> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Sign Out"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            האם אתה רוצה להתנתק מהאתר?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>לא</Button>
          <Button onClick={handleChange}>כן</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
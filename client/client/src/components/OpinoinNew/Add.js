import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import HoverRating from './Rate';


export default function Add() {
    const [open, setOpen] = React.useState(false);
    const [value,setValue]=useState("");
    const [disabled	,setDisabled]=useState(true);
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr);
    const [dis,setDis]=useState(false);
    const ifClient= ()=>{
        if(user.kind==0)
         setDis(true);
         else
         setDis(false);

   }

  
    const handleClickOpen = () => {
      ifClient();
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleCloseAdd = () => {
        setOpen(false);
        alert("פה להוסיף את החוות דעת לטבלת החוות דעת");
        
      };
    const handleChange= e =>{
        setValue(e.target.value);
        setDisabled(!e.target.value);
    }
 
  
    return (
      <div>
        <Button  disabled={dis} onClick={handleClickOpen} disabled={dis}>
          <AddIcon htmlColor="white" />
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Opinion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Rate <HoverRating/>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="tell us more"
              type="text"
              fullWidth
              variant="standard"
              multiline="true"
              required="true"
              value={value}
              onChange={handleChange}
              
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={disabled} onClick={handleCloseAdd}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
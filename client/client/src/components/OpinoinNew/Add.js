import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import HoverRating from './Rate';
import axios from "axios";


export default function Add(props) {
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = useState(true);
  const [dis, setDis] = useState(false);
  const userStr = localStorage.getItem("user");
  const user = JSON.parse(userStr);

  useEffect(() => {
        const canResponse = props.canResponse;
        console.log(props);
        setDis(!canResponse);
  }, [])


  const ifClient = () => {
    if (user.kind == 0)
      setDis(true);
    else
      setDis(false);

  }

  //מהפרופס - קוד עובד קוד מעביד
  //משתנים להוספת חוות דעת:מהטופס הזה:    דירוג תיאור
  const [rank, setRank] = useState(0);
  const [value, setValue] = useState(""); //description


  const handleClickOpen = () => {
    ifClient();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAdd = () => {
    setOpen(false);
    const body = {
      client: props.clientId, emp: props.empId, rank: rank, desc: value
    };
    console.log("body to opinion", body)
    axios.post(`http://localhost:8080/addOpinion`, body).then((res) => {
      if (res.data.insertId)
        props.addOpinionToGui(body);
    })

  };
  const handleChange = e => {
    setValue(e.target.value);
    setDisabled(!e.target.value);
  }
  const handleRankChange = (rank) => {
    setRank(rank);
    console.log("rank: " + rank);
  }


  return (
    <div>
      {dis == true?<></>:<Button disabled={dis} onClick={handleClickOpen} disabled={dis}>
        <AddIcon htmlColor="white" />
      </Button>}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Opinion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rate <HoverRating handleOnChange={handleRankChange} />
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
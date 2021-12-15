import { Button, createStyles, TextField} from '@mui/material';
import React from 'react'
import { makeStyles } from "@mui/styles";
import SendIcon from '@mui/icons-material/Send';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();


// import TextField from '@material-ui/core/TextField';
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import SendIcon from '@material-ui/icons/Send';
// import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "95%",
      //  margin: `${theme.spacing(0)} auto`
    },
    wrapText  : {
        width: "100%"
    },
    button: {
        //margin: theme.spacing(1),
    },
  })
);


export const TextInput = () => {
    const classes = useStyles();
    return (
        <>
            <form className={classes.wrapForm}  noValidate autoComplete="off">
            <TextField
                id="standard-text"
                label="Send"
                className={classes.wrapText}
                //margin="normal"
            />
            <Button variant="contained" color="primary" className={classes.button}>
                <SendIcon />
            </Button>
            </form>
        </>
    )
}


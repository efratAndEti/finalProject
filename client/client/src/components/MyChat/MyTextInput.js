import { Button, createStyles, TextField } from '@mui/material';
import React from 'react'
import { makeStyles } from "@mui/styles";
import SendIcon from '@mui/icons-material/Send';
import { createTheme } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { Message } from '@mui/icons-material';

const theme = createTheme();


// import TextField from '@material-ui/core/TextField';
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import SendIcon from '@material-ui/icons/Send';
// import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme =>
    createStyles({
        wrapForm: {
            display: "flex",
            justifyContent: "center",
            width: "95%",
            //  margin: `${theme.spacing(0)} auto`
        },
        wrapText: {
            width: "100%"
        },
        button: {
            //margin: theme.spacing(1),
        },
    })
);


export const MyTextInput = (props) => {
    const { onAddMassage } = props;

    const classes = useStyles();
    const [value, setValue] = useState("");


    const addMassage = () => {
        const massage = {
            from_m: props.from_m,
            to_m: props.to_m,
            title: "",
            content: value,
            kind: "standart"
        }
        setValue("");
        axios.post('http://localhost:8080/addMassage', massage).then((res) => {
            massage.id_msg = res.data.insertId;
            onAddMassage(massage);
        });
    }

    return (
        <>
            <form className={classes.wrapForm} noValidate autoComplete="off">
                <TextField
                    id="standard-text"
                    label="Type Somthing"
                    className={classes.wrapText}
                    onChange={(e) => { setValue(e.target.value) }}
                    value={value}
                />
                <Button onClick={addMassage} variant="contained" color="primary" className={classes.button}>
                    <SendIcon />
                </Button>
            </form>
        </>
    )
}


import { Avatar, createStyles } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import React from "react";
import stringAvatar from "../Chats/Color";

// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import Avatar from "@material-ui/core/Avatar";
// import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles(theme =>
    createStyles({
        messageRow: {
            display: "flex"
        },
        messageRowRight: {
            display: "flex",
            justifyContent: "flex-end"
        },
        messageBlue: {
            position: "relative",
            marginLeft: "20px",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#A8DDFD",
            width: "60%",
            //height: "50px",
            textAlign: "left",
            font: "400 .9em 'Open Sans', sans-serif",
            border: "1px solid #97C6E3",
            borderRadius: "10px",
            "&:after": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "15px solid #A8DDFD",
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                top: "0",
                left: "-15px"
            },
            "&:before": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "17px solid #97C6E3",
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                top: "-1px",
                left: "-17px"
            }
        },
        messageOrange: {
            position: "relative",
            marginRight: "20px",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#f8e896",
            width: "60%",
            //height: "50px",
            textAlign: "left",
            font: "400 .9em 'Open Sans', sans-serif",
            border: "1px solid #dfd087",
            borderRadius: "10px",
            "&:after": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "15px solid #f8e896",
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                top: "0",
                right: "-15px"
            },
            "&:before": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "17px solid #dfd087",
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                top: "-1px",
                right: "-17px"
            }
        },

        messageContent: {
            padding: 0,
            margin: 0
        },
        messageTimeStampRight: {
            position: "absolute",
            fontSize: ".85em",
            fontWeight: "300",
            marginTop: "10px",
            bottom: "-3px",
            right: "5px"
        },
        orange: {
            color: '#ffab91',
            //theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
            // width: theme.spacing(4),
            //height: theme.spacing(4)
        },
        avatarNothing: {
            color: "transparent",
            backgroundColor: "transparent",
            // width: theme.spacing(4),
            // height: theme.spacing(4)
        },
        displayName: {
            marginLeft: "20px"
        }
    })
);

//avatarが左にあるメッセージ（他人）
export const MyMessageLeft = (props) => {
    const title = props.title ? props.title : "";
    const message = props.message ? props.message : "no message";
    const timestamp = props.timestamp ? props.timestamp : "";
    // const photoURL = props.photoURL ? props.photoURL : "dummy.js";
    const displayName = props.displayName ? props.displayName : "Sam";
    const classes = useStyles();
    return (
        <>
            <div className={classes.messageRow}>
                <Avatar
                    alt={displayName}
                    {...stringAvatar(displayName)}
                    className={classes.orange}
                ></Avatar>
                <div>
                    <div className={classes.displayName}>{displayName}</div>
                    <div className={classes.messageBlue}>
                        <div>
                            <b><p>{title}</p></b>
                            <p className={classes.messageContent}>{message}</p>
                        </div>
                        <div className={classes.messageTimeStampRight}>{timestamp}</div>
                    </div>
                </div>
            </div>
        </>
    );
};
//avatarが右にあるメッセージ（自分）
export const MyMessageRight = (props) => {
    const classes = useStyles();
    const title = props.title ? props.title : "";
    const message = props.message ? props.message : "no message";
    const displayName = props.displayName ? props.displayName : "Sam";
    const timestamp = props.timestamp ? props.timestamp : "";
    return (
        <div className={classes.messageRowRight}>
            <Avatar
                alt={displayName}
                {...stringAvatar(displayName)}
                className={classes.orange}
            ></Avatar>
            <div className={classes.messageOrange}>
                <b><p>{title}</p></b>
                <p className={classes.messageContent}>{message}</p>
                <div className={classes.messageTimeStampRight}>{timestamp}</div>
            </div>
        </div>
    );
};


export const MySystemMessage = (props) => {
    const title = props.title ? props.title : "";
    const message = props.message ? props.message : "no message";
    const timestamp = props.timestamp ? props.timestamp : "";
    const kind = props.kind;
    const from_m = props.from_m;
    const to_m = props.to_m;
   //לשלוח ב mychat
    const makeChanges = (kind, from_m, to_m, ok)=>{
        //כאן לפי הסוג של ההןדעה ולפי המשתנה ok
        //תוכלו לדעת אילו שינויים לבצע בדאטה בייס
        //ואיזה הודעות חדשות ליצור
        //תשתמשו ב"ממי" ול-"למי" כדי לעדכן את הדאטה בייס
        alert("שינויים שצריך");
    }
   
    return (
        <div style={{
            textAlign: "center",
            width: "50%",
            margin: "auto",
            border: "3px solid black",
            backgroundColor: "white",
            borderRadius: "10%"
        }}>
            <p><b>{title}</b></p>
            <p> {message}</p>
            {
                kind == "startTry" || kind == "checkClientOK" || kind == "checkEmpOK" ?
                    <> <button onClick={()=>{ makeChanges(kind,from_m,to_m, true ) }}>אישור</button>
                        <button onClick={()=>{ makeChanges(kind,from_m,to_m, false ) }}>ביטול</button></> :
                    <></>
            }
        </div>
    );
};

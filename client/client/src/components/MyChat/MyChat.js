import React from "react";
import { createStyles, Paper } from "@mui/material";
import { makeStyles, Theme } from "@mui/styles";
import { MyMessageLeft, MyMessageRight, MySystemMessage } from "./MyMassage.js";
import { MyTextInput } from "./MyTextInput.js";

const useStyles = makeStyles(theme =>
    createStyles({
        paper: {
            width: "80vw",
            height: "80vh",
            maxWidth: "500px",
            maxHeight: "700px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        paper2: {
            width: "80vw",
            maxWidth: "500px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        container: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        messagesBody: {
            width: "calc( 100% - 20px )",
            margin: 10,
            overflowY: "scroll",
            height: "calc( 100% - 80px )"
        }
    })
);

export default function MyChats(props) {
    const { massages, currentUser, otherUser,onAddMassage } = props;
    console.log(currentUser);
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Paper className={classes.paper} zDepth={2}>
                <Paper id="style-1" className={classes.messagesBody}>
                    {
                        massages.map(m => {
                            if (m.kind != "standart") {
                                if (m.to_m == currentUser.id)
                                    return (<MySystemMessage
                                        title={m.title}
                                        message={m.content}
                                        timestamp={m.date}
                                        displayName={otherUser.name}
                                        avatarDisp={false}
                                        //kind={}
                                        from_m="system"
                                        to_m={otherUser}
                                    />)
                            }
                            else
                                if (m.from_m != currentUser.id)
                                    return (<MyMessageRight
                                        title={m.title}
                                        message={m.content}
                                        timestamp={m.date}
                                        photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                                        displayName={otherUser.name}
                                        avatarDisp={true}
                                    />)
                                else
                                    return (<MyMessageLeft
                                        title={m.title}
                                        message={m.content}
                                        timestamp={m.date}
                                        photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                                        displayName={currentUser.name}
                                        avatarDisp={false}
                                    />)
                        })
                    }
                </Paper>
                <MyTextInput from_m={currentUser.id} to_m={otherUser.id} onAddMassage={onAddMassage} />
            </Paper>
        </div>
    );
}

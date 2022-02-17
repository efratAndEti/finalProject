import React from "react";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import { Paper } from "@material-ui/core";
import { TextInput } from "./TextInput.js";
import { createStyles, Paper } from "@mui/material";
import { MessageLeft, MessageRight , SystemMessage} from "./Massage.js";
import { makeStyles, Theme } from "@mui/styles";

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

export default function Chats(props) {
  const { massages, currentUser, otherUser } = props;
  console.log(currentUser);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Paper className={classes.paper} zDepth={2}>
        <Paper id="style-1" className={classes.messagesBody}>

          {
            massages.map(m => {
              // if(m.kind !="standart")
              // {
              //     return(<SystemMessage
                    
              //       />)
              // }
              // else 
              if (m.from_m != currentUser.id_client)
                return (<MessageRight
                  message={m.title  + m.content}
                  timestamp={m.date}
                  photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                  displayName={otherUser.first_name + ' ' + otherUser.last_name}
                  avatarDisp={true}
                />)
              else
                return (<MessageLeft
                  message={m.title  + m.content}
                  timestamp={m.date}
                  photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                  displayName={currentUser.first_name + " " + currentUser.last_name}
                  avatarDisp={false}
                />

                )
            })
          }

          {/* <MessageLeft
            message="hi how are you?"
            // timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="Joy Rpy"
            avatarDisp={true}
          />
          <MessageLeft
            message="are you ok?"
            timestamp="MM/DD 00:00"
            photoURL=""
            displayName="Bem Her"
            avatarDisp={false}
          />
          <MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="me"
            avatarDisp={true}
          />
          <MessageRight
            message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="me"
            avatarDisp={false}
          /> */}
        </Paper>
        <TextInput from_m={currentUser.id_client} to_m={otherUser.emp_id}/>
      </Paper>
    </div>
  );
}

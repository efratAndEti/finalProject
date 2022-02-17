import { Avatar, Divider, Fab, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

import axios from 'axios';
import MyChats from './MyChat';
import stringAvatar from '../Chats/Color';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});

const MyMassagesPage = (props) => {

    const { id } = props;
    console.log(props);
    const [massagesData, setMassagesData] = useState(null);
    const classes = useStyles();

    let interval = null;

    useEffect(() => {
        if (interval)
            clearInterval(interval);
        interval = setInterval(() => {
            axios.get(`http://localhost:8080/getMassagesById/${id}`).then((res) => {
                console.log(res.data);
                if (res.data == "error") {
                    return;
                }
                setMassagesData(res.data);
            })

            return () => {
                clearInterval(interval);
                console.log("inteval cleared");
            }
        }, 30000);



        axios.get(`http://localhost:8080/getMassagesById/${id}`).then((res) => {
            console.log(res.data);
            if (res.data == "error") {
                return;
            }
            setMassagesData(res.data);
        })
    }, [id])

    const onAddMassage = (m) => {
        const modifiedData = { ...massagesData };
        modifiedData.massages.push(m);
        setMassagesData(modifiedData);
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12} >
                    <Typography variant="h5" className="header-message">הודעות</Typography>
                </Grid>
            </Grid>
            {!massagesData ? <p>טוען....</p> :
                <Grid container component={Paper} className={classes.chatSection}>
                    <Grid item xs={3} className={classes.borderRight500}>
                        <List>
                            <ListItem button key={massagesData.currentUser.name}>
                                <ListItemIcon>
                                    <Avatar alt={massagesData.currentUser.name} {...stringAvatar(massagesData.currentUser.name)} />
                                </ListItemIcon>
                                <ListItemText primary={massagesData.currentUser.name}></ListItemText>
                            </ListItem>
                        </List>
                        <Divider />
                        {massagesData.otherUser == null ? <p>במערכת לא נמצא משתמש הנמצא איתך בקשר </p> :
                            <>
                                <Grid item xs={12} style={{ padding: '10px' }}>
                                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                                </Grid>
                                <Divider />
                                <List>
                                    <ListItem button key="RemySharp">
                                        <ListItemIcon>
                                            <Avatar alt="Remy Sharp" {...stringAvatar(massagesData.otherUser.name)} />
                                        </ListItemIcon>
                                        <ListItemText primary={massagesData.otherUser.name}></ListItemText>
                                    </ListItem>
                                </List>
                            </>
                        }
                    </Grid>
                    <Grid item xs={7}>
                        {/* <List className={classes.messageArea}> */}
                        {!massagesData.otherUser ? <p>אין לך הודעות לצפות בהן תוכל לכתוב הודעה למנהל המערכת</p> : <MyChats massages={massagesData.massages} currentUser={massagesData.currentUser} otherUser={massagesData.otherUser} onAddMassage={onAddMassage} />
                        }
                        <Divider />

                    </Grid>
                </Grid>
            }
        </div>
    );
}

export default MyMassagesPage;
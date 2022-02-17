import { Avatar, Divider, Fab, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import SendIcon from '@mui/icons-material/Send';
import stringAvatar from './Color';
import AddIcon from '@mui/icons-material/Add';
import Add from './Add';
import Chats from '../Massages/Chat'
import axios from 'axios';

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

const Massage = () => {
    const client = JSON.parse(localStorage.getItem("client"));
    const name = client.first_name + " " + client.last_name;
    const [massagesData, setMassagesData] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        axios.get(`http://localhost:8080/getClientMassagesById/${client.id_client}`).then((res) => {
            console.log(res);
            setMassagesData(res.data);
        })
    }, [])

    return (
        <div>
            <Grid container>
                <Grid item xs={12} >
                    <Typography variant="h5" className="header-message">הודעות</Typography>
                </Grid>
            </Grid>
            {!massagesData ? <p>טוען....</p>:
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key={name}>
                            <ListItemIcon>
                                <Avatar alt={name} {...stringAvatar(name)} />
                            </ListItemIcon>
                            <ListItemText primary={name}></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    { massagesData.emp == null ? <p>במערכת לא נמצא עובד הנמצא בקשר איתך</p> :
                        <>
                            <Grid item xs={12} style={{ padding: '10px' }}>
                                <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                            </Grid>
                            <Divider />
                            <List>
                                <ListItem button key="RemySharp">
                                    <ListItemIcon>
                                        <Avatar alt="Remy Sharp" {...stringAvatar(massagesData.emp.first_name + ' '+ massagesData.emp.last_name)} />
                                    </ListItemIcon>
                                    <ListItemText primary={massagesData.emp.first_name + ' '+ massagesData.emp.last_name}></ListItemText>
                                    {/* <ListItemText secondary="online" align="right"></ListItemText> */}
                                </ListItem>
                                {/* <ListItem button key="Alice">
                                    <ListItemIcon>
                                        <Avatar alt="Alice A" {...stringAvatar('Alice A')} />
                                    </ListItemIcon>
                                    <ListItemText primary="Alice">Alice</ListItemText>
                                </ListItem>
                                <ListItem button key="CindyBaker">
                                    <ListItemIcon>
                                        <Avatar alt="Cindy Baker"{...stringAvatar('Cindy Baker')} />
                                    </ListItemIcon>
                                    <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                                </ListItem> */}
                            </List>

                        </>
                    }
                </Grid>
                <Grid item xs={7}>
                    {/* <List className={classes.messageArea}> */}
                    <Chats massages={massagesData.massages} currentUser={client}  otherUser={massagesData.emp}/>
                    {/* <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:31"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem> */}
                    {/* </List>  */}
                    <Divider />
                    {/* <Grid container style={{padding: '0px'}}>
                    <Grid xs={11} align="right">
                        <Fab color="primary" aria-label="add"><Add /></Fab>
                    </Grid>
                </Grid> */}
                </Grid>
            </Grid>
            }
        </div>
    );
}

export default Massage;
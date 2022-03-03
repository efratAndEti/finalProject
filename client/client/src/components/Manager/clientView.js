import { AppBar, Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, Fab, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { color } from "@mui/system";
import HoverRating from "../Chats/Rate";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});
const ClientView = (props) => {
    const { valueSearch, field } = props
    const [allClients,setAllClients]=useState([]);
    const [clients, setClients] = useState([]);
    const [open, setOpen] = useState(false);
    const [clientId, setClientId] = useState();
    const [name, setName] = useState();
    useEffect(() => {
        axios.get(`http://localhost:8080/getClients`).then((res) => {
            console.log(res.data);
            setClients(res.data);
            setAllClients(res.data);
        })
    }, [])
    useEffect(() => {
        console.log(props);
        
        if (clients && field && valueSearch) {
            let tempClients = clients.filter(client => client[field] && client[field].includes(valueSearch))
            setClients(tempClients)
        }
        else{
            setClients(allClients);
        }

    }, [valueSearch, field])
    const handleClickOpen = (name, client) => {
        setOpen(true);
        setName(name);
        setClientId(client);

    };
    const handleClose = () => {
        setOpen(false);
    };
    const sendMassage = () => {
        alert("send msg to" + clientId);
        handleClose();
    }
    return (
        <Grid container spacing={3} columns={12}>
            {clients?.map((e) => (
                //emp_id, last_name, first_name, end_visa_period, type, status_emp, gender, address, city, phone, password, mail, birth_date, user_id
                  //id_client, last_name, first_name, birth_date, disability_perc, eligibility_hours, client_status, gender, phone, mail, address, city, DegreeOfNursing, HoursPerWeek, HoursInDay, empType, user_id    
                      <Grid item sx={3}>
                         <Button onClick={(evt) => { handleClickOpen(e.first_name, e.clientId); console.log(e); }}>
                          <Card id="card" style={{ width: '22vw', textAlign: 'center' }} onClick={(evt)=>{console.log(e.birth_date)}}>
                              <CardHeader title={e.first_name+' '+e.last_name}/>
                              <CardContent>
                                  {e.gender==0?<ManIcon sx={{ fontSize: 40 }}style={{ color: '#006064' }}/>:
                                  <WomanIcon sx={{ fontSize: 40 }}style={{ color: '#006064' }}/> }
                              </CardContent>
                              <CacheProvider value={cacheRtl}>
                                  <List sx={{ width: '100%', maxWidth: 360, bgcolor: '' }}>
                                      <ListItem>
                                          <ListItemText primary={e.city} secondary="" />
                                          <ListItemIcon>
                                              <LocationOnOutlinedIcon style={{ color: '#006064' }} />
                                          </ListItemIcon>
                                      </ListItem>
                                      <ListItem>
                                          <ListItemText primary={e.phone} secondary="" />
                                          <ListItemIcon>
                                              <LocalPhoneOutlinedIcon style={{ color: '#006064' }} />
                                          </ListItemIcon>
                                      </ListItem>
                                      <ListItem>
                                          <ListItemText primary={e.mail} secondary="" />
                                          <ListItemIcon>
                                              <EmailOutlinedIcon style={{ color: '#006064' }} />
                                          </ListItemIcon>
                                      </ListItem>
                                      <ListItem>
                                          <ListItemText primary={e.birth_date} secondary="" />
                                          <ListItemIcon>
                                              <EventNoteOutlinedIcon style={{ color: '#006064' }} />
                                          </ListItemIcon>
                                      </ListItem>
                                  </List>
                              </CacheProvider>
                          </Card>
                          </Button>
                      </Grid>
            ))}
                        <Dialog fullWidth open={open} onClose={handleClose} >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {name} הודעה ל
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* <DialogTitle>opinion</DialogTitle> */}
                <DialogContent>
                    <DialogContentText style={{textAlign:'center'}}>
                        <TextField  id="standard-basic" label="כותרת" variant="standard" />
                        <br />
                        <TextField
                            fullWidth
                            id="standard-multiline-static"
                            label="פירוט"
                            multiline
                            rows={4}
                            variant="standard"
                        />
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose}>Cancel</Button> */}
                    <Grid xs={11} align="right">
                        <Fab color="primary" aria-label="add">
                            <IconButton onClick={sendMassage}>
                                <SendIcon />
                            </IconButton>
                        </Fab>
                    </Grid>
                </DialogActions>
            </Dialog>
  
        </Grid>
    );
}
export default ClientView

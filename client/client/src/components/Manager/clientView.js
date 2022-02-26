import { Button, Card, CardContent, CardHeader, Grid, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
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

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});
const ClientView = () => {

    const [clients, setClients] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/getClients`).then((res) => {
            console.log(res.data);
            setClients(res.data);
        })
    }, [])
    return (
        <Grid container spacing={3} columns={12}>
            {clients.map((e) => (
                //emp_id, last_name, first_name, end_visa_period, type, status_emp, gender, address, city, phone, password, mail, birth_date, user_id
                  //id_client, last_name, first_name, birth_date, disability_perc, eligibility_hours, client_status, gender, phone, mail, address, city, DegreeOfNursing, HoursPerWeek, HoursInDay, empType, user_id    
                      <Grid item sx={3}>
                         <Button>
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
  
        </Grid>
    );
}
export default ClientView

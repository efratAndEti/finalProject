import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Card, Checkbox, FormControlLabel, FormGroup, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Rating, Typography } from '@mui/material';
import { cities } from './../../assets/cities.json';
import { languages } from './../../assets/languages.json';
import { StayCurrentLandscapeTwoTone } from '@mui/icons-material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});



const SearchEmp = () => {

    const [client, setClient] = useState(null);
    const [emps, setEmps] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [opinions, setOpinions] = useState([]);
    const [avg, setAvg] = useState(0);
    const [preferences, setPreferences] = useState({
        gender: null,
        stars: null,
        city: null,
        age: null,
        language: null,
        minAge: null,
        maxAge: null
    });// אובייקט לקליטת העדפות המשתמש

    //  /getListOfEmps/:id
    useEffect(() => {
        const clientStorage = JSON.parse(localStorage.getItem("client"));
        setClient(clientStorage);
        axios.get(`http://localhost:8080/getListOfEmps/${clientStorage.id_client}`).then((res) => {
            res.data.sort((a, b) => b.count - a.count);
            setEmps(res.data);
        })

    }, [])



    useEffect(() => {
        if (selectedEmp == null)
            return;
        axios.get(`http://localhost:8080/getOpinionById/${selectedEmp.emp_id}`).then((res) => {


            console.log('opinions', res.data);
            setOpinions(res.data);


        })
    }, [selectedEmp])

    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < opinions.length; i++)
            sum += opinions[i].rank;
        const myAvg = sum / opinions.length;
        console.log("avg", opinions.length);
        setAvg(myAvg);
    }, [opinions])



    //פונקתיה לשינוי ערך ההעדפה לערך ברירת מחדל (מאפשר לדעת האם להציג למשתמש בחירת העדפה)
    const togglePreference = (pref) => {
        const modifiedPref = { ...preferences };
        if (modifiedPref[pref] == null)
            modifiedPref[pref] = true; //שינוי לערך true זמני עד לקליטת בחירת המשתמש
        else
            modifiedPref[pref] = null;//שינוי חזרה ל-null כדי להבסתיר מהמשתמש אפשרות בחירה
        setPreferences(modifiedPref);
    }

    //פונקציה לשינוי הערך שנקלט בטופס
    const setPreferenceValue = (pref, value) => {
        const modifiedPref = { ...preferences };
        modifiedPref[pref] = value;
        setPreferences(modifiedPref);
    }

    //פונקציה לשליחת בקשה לשרת לסינון העובדים ע''פ העדפות
    const searchPreferences = () => {
        let query = `http://localhost:8080/getListOfEmps/${client.id_client}?`;
        for (let pref of Object.keys(preferences)) {

            if (preferences[pref] != null && preferences[pref] != true)
                query += `${pref}=${preferences[pref]}&`;
        }
        alert(query);
        axios.get(query).then((res) => {
            res.data.sort((a, b) => b.count - a.count);
            setEmps(res.data);
        })
    }

    const sendInvitationToInterview = () => {
        //יצירת הודעת הזמנה לראיון
        const obj = {
            from_m: {
                id: client.id_client,
                first_name: client.first_name,
                last_name: client.last_name
            },
            to_m: {
                id: selectedEmp.emp_id,
                first_name: selectedEmp.first_name,
                last_name: selectedEmp.last_name
            },
            kind: "startTry"
        }
        axios.post("http://localhost:8080/addSystemMassage", obj).then((res) => {
            alert("הודעה על הזמנה לראיון נשלחה ללקוח")
        })
        //יצירת קשר בין לקוח לעובד
        //להוסיף פונקציה בשרת שמוסיפה קשר בין לקוח לעובד
        //להפעיל כאן
        axios.post("http://localhost:8080/", obj).then((res) => {

        })
        //להוסיף פונקציה בשרת שמשנה סטטוס לעובד ולקוח. להפעיל כאן
        axios.post("http://localhost:8080/", obj).then((res) => {

        })
    }

    return (
        <div>
            <Grid container spacing={0} columns={9}>
                <Grid item xs={3} style={{ backgroundColor: '#0097a7', minHeight: '80vh' }}>
                    <div style={{ margin: 'auto', width: '94%', minHeight: '100%', backgroundColor: '#ffffffc4', textAlign: 'center' }}>
                        {
                            selectedEmp == null ?
                                <p>כאן תוכל לצפות בפרט העובד שבו אתה מעוניין</p>
                                :
                                <>
                                    <h1> {selectedEmp.count * 10}%</h1>
                                    <p><h3>{selectedEmp.first_name}  {selectedEmp.last_name}</h3></p>
                                    <CacheProvider value={cacheRtl}>
                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: '' }}>
                                            <ListItem>

                                                <ListItemText primary={selectedEmp.city} secondary="" />

                                                <ListItemIcon>
                                                    <LocationOnOutlinedIcon style={{ color: '#006064' }} />
                                                </ListItemIcon>

                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary={selectedEmp.phone} secondary="" />

                                                <ListItemIcon>
                                                    <LocalPhoneOutlinedIcon style={{ color: '#006064' }} />
                                                </ListItemIcon>

                                            </ListItem>
                                            <ListItem>

                                                <ListItemText primary={selectedEmp.mail} secondary="" />
                                                <ListItemIcon>

                                                    <EmailOutlinedIcon style={{ color: '#006064' }} />

                                                </ListItemIcon>

                                            </ListItem>
                                        </List>
                                    </CacheProvider>
                                    {/* <p>{selectedEmp.address}  {selectedEmp.city}</p>
                                    <p>{selectedEmp.phone}  </p>
                                    <p>{selectedEmp.mail} </p> */}
                                    <div><Rating name="read-only" precision={0.5} value={avg} readOnly /></div>
                                    <br />
                                    <br />

                                    <Button style={{ backgroundColor: '#006064', color: 'white' }} onClick={sendInvitationToInterview}>הזמן לראיון</Button><br />

                                </>
                        }

                    </div>
                </Grid>
                <Grid item xs={3} style={{ backgroundColor: 'white', minHeight: '80vh' }}>
                    <div style={{ margin: 'auto', width: '94%', minHeight: '100%', backgroundColor: '#ffffffc4' }}>
                        {emps.map(e =>
                            <ul id='list' style={{textAlign:'center'}} >
                                <Card>
                                <li onClick={() => { setSelectedEmp(e) }} style={{textAlign:'center', margin:'auto'}}>
                                    
                                    <p> {e.emp_id}  {e.first_name}  {e.last_name}</p>
                                    <div style={{ margin: 'auto', padding: '3px', width: '100%', minHeight: '10px', backgroundColor: 'gray' }}>
                                        <div style={{ width: e.count * 10 + '%', minHeight: '8px', backgroundColor: 'red' }}>

                                        </div>
                                    </div>
                                </li>
                                </Card>
                            </ul>
                        )}
                    </div>
                </Grid>
                <Grid item xs={3} style={{ backgroundColor: '#0097a7', minHeight: '80vh' }}>
                    <div style={{
                        margin: 'auto', width: '94%', height: '100%',
                        backgroundColor: '#ffffffc4',
                        textAlign: 'center'
                    }}>
                        <p>כאן תוכלו לצפות ברשימת העובדים הפנויים</p>
                        <p>בחרו איזו רמת התאמה אתם רוצים </p>
                        <Button style={{ backgroundColor: '#0097a7', color: 'white' }}>רמת התאמה מירבית</Button><br /><br />
                        <Button style={{ backgroundColor: '#0097a7', color: 'white' }}>רשימת עובדים מלאה</Button><br />


                        {/* טופס קליטת העדפות אישיות. */}
                        <div style={{
                            // border: "2px black solid", 
                            margin: "5%",
                            display: "flex", flexDirection: "column", direction: "rtl", alignItems: "start"
                        }}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography> העדפות אישיות</Typography>
                                </AccordionSummary>
                                <AccordionDetails>


                                    <hr />
                                    {/* מין */}
                                    <FormGroup>

                                        <FormControlLabel control={<Checkbox  style={{ color: '#0097a7' }} value={false} onChange={() => { togglePreference("gender")  }} />} label = "אני מעוניין לבחור מין"  />
                                        {preferences.gender != null ?
                                            <select onChange={(e) => { setPreferenceValue("gender", e.target.value) }}>
                                                <option value="0">גבר</option>
                                                <option value="1">אישה</option>
                                            </select>
                                            : <></>}
                                        {/* שפה */}

                                        <FormControlLabel control={<Checkbox  style={{ color: '#0097a7' }} value={false} onChange={() => { togglePreference("language") }}/>} label = "חשוב לי עובד שמדבר בשפתי" />
                                        {preferences.language != null ?
                                            <select onChange={(e) => { setPreferenceValue("language", e.target.value) }}>
                                                {languages.map(l => <option value={l.english_name}>{l.hebrew_name}</option>)}
                                            </select>
                                            : <></>}
                                        {/* מספר כוכבים */}
                                        <FormControlLabel control={<Checkbox  style={{ color: '#0097a7' }} value={false} onChange={() => { togglePreference("stars")}}/>} label = "אני מחפש עובד שקיבל דירוג של לפחות:"  />
                                        
                                        {preferences.stars != null ?
                                            <>
                                                <input type="range" min="0" max="5" onChange={(e) => { setPreferenceValue("stars", e.target.value) }}></input>
                                                <p>{preferences.stars != true ? preferences.stars : "0"}</p>
                                            </>
                                            : <></>}
                                        {/* גיל */}
                                        <FormControlLabel control={<Checkbox  style={{ color: '#0097a7' }} value={false} onChange={() => { togglePreference("age") }}/>} label = "  אני מחפש עובד בטווח גילאים: "/>
                                        {preferences.age != null ?
                                            <p>     <input type="number" onChange={(e) => { setPreferenceValue("minAge", e.target.value) }} /> - <input type="number" onChange={(e) => { setPreferenceValue("maxAge", e.target.value) }} /></p>
                                            : <></>}
                                        {/* עיר */}
                                        <FormControlLabel control={<Checkbox style={{ color: '#0097a7' }} value={false} onChange={() => { togglePreference("city") }}/>} label = "אני מחפש עובד בן עירי"/>
                                        {preferences.city != null ?
                                            <select onChange={(e) => { setPreferenceValue("city", e.target.value) }}>
                                                {cities.city.map(c => <option value={c.hebrew_name}>{c.hebrew_name}</option>)}
                                            </select>
                                            : <></>}
                                    </FormGroup>

                                    <Button onClick={searchPreferences}>סנן</Button>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div >
    );
}
export default SearchEmp
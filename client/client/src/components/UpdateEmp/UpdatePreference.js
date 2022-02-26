import { Button, Card, CardActions, CardContent, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, NativeSelect, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { Box, textAlign } from "@mui/system";
import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from "@emotion/react";
import axios from "axios";
import { alignProperty } from "@mui/material/styles/cssUtils";




const UpdatePreference = () => {



    // useEffect(() => {
    //     const userStr = localStorage.getItem("user");
    //     const user = JSON.parse(userStr);
    //     const use;
    //     if (user.id == 1) {


    //     }
    //     else {
    //         const empStr = localStorage.getItem("employee");
    //         use = JSON.parse(empStr);
    //     }

    //     setU(use);
    // })

   
    // const [emp_id, setEmpId] = useState();
    const [gender, setGender] = useState();
    

    const [desPerc, setDesPerc] = useState();
    const [age, setAge] = useState();
    const [hour, setHour] = useState();
    const [statusClient,setStatus]=useState();
    const [emp, setEmp] = React.useState(null);
    const [pref,setPref]=useState([]);
    useEffect(() => {
        const e = JSON.parse(localStorage.getItem("employee"));
        setEmp(e);
        const id=e.emp_id;
        axios.get(`http://localhost:8080/getPreferenceById/${id}`).then((res) => {
            console.log(res.data);
            if(res.data.success==true)
            setPref(res.data.preference)
            else
            setPref(0)
            console.log(pref)
        })
        
        
    }, [])
    
   


    const theme = createTheme({
        direction: 'rtl', // Both here and <body dir="rtl">
    });
    // Create rtl cache
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [rtlPlugin],
    })
    const ChangePref = () => {
        let id=pref[0].idpreferences
        
        const obj ={
            id,
            gender,
            age,
            desPerc,
            hour,
            statusClient
        }
        axios.put("http://localhost:8080/updatePreferences", obj).then((res) => {
            alert("הודעה על הזמנה לראיון נשלחה ללקוח")
        })
        alert("chnge pref and send to home")
    }

    const changeGender = (event) => {
        if (event.target.value == 'male')
            setGender(0);
        else
            setGender(1);
    };
    // age: 80
    // disabllity_perc: 50
    // emp_id: "3243"
    // gender: 0
    // hours_in_day: null
    // idpreferences: 1
    // status_client: 2
    return (
       pref.length>0?
        <Grid
            container
            spacing={24}
            justify="center"
            alignItems="center"
            justifyContent="center"
            padding={3}>
            <CacheProvider value={cacheRtl}>
                <Grid item xs={7} >
                    <Card style={{ width: '50vw', height: '100vh', textAlign: 'center', align: 'center' }}>
                        <CardContent>
                            <CardContent >
                                <FormControl component="fieldset" dir="rtl">
                                    <FormLabel component="legend">מין</FormLabel>
                                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group" defaultValue={pref[0].gender==1?"female":"male"} onChange={changeGender}>
                                        <FormControlLabel value="male" control={<Radio />} label="זכר" />
                                        <FormControlLabel value="female" control={<Radio />} label="נקבה" />
                                    </RadioGroup>
                                </FormControl>
                            </CardContent>
                            <CardContent>
                                <TextField
                                    id="standard-number"
                                    label="אחוזי נכות"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    //pref?:
                                    defaultValue={pref[0].disabllity_perc}
                                    onChange={(e) => { setDesPerc(e.target.value);console.log(e.target.value);}}
                                />
                                <>                                                                                                      </>
                                <TextField
                                    id="standard-number"
                                    label="גיל"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    defaultValue={pref[0].age}
                                    onChange={(e) => { setAge(e.target.value) }}
                                />
                            </CardContent>
                            <CardContent>
                                <TextField
                                    id="standard-number"
                                    label="שעות ביום"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    helperText="לעובדי מטב"
                                    defaultValue={pref[0].hours_in_day}
                                    onClick={(e) => { setHour(e.target.value) }} />
                            </CardContent>
                            <CardContent>

                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    סטטוס מטופל
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={pref[0].status_client}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                    style={{ width: '20vw' }}
                                    onChange={(e)=>setStatus(e.target.value)}
                                >   <option value={""}></option>
                                    <option value={3}>תסמונת</option>
                                    <option value={1}>סיעודי מלא</option>
                                    <option value={2}>סיעודי חלקי</option>
                                </NativeSelect>
                            </CardContent>
                            <br /><br />
                            <Grid style={{ textAlign: 'center' }}>
                                <Button variant="contained" size="large" onClick={ChangePref} style={{ background: '#006064' }}>
                                    שמירה
                                </Button>
                            </Grid>
                        </CardContent>

                    </Card>
                </Grid>
            </CacheProvider>
        </Grid>:<>אין לך העדפות, עבור למילוי העדפות
                   <br/> <Button>הכנסת העדפות</Button></>
    );
}
export default UpdatePreference
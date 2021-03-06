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
    const [statusClient, setStatus] = useState();
    const [emp, setEmp] = React.useState(null);
    const [pref, setPref] = useState([]);
    useEffect(() => {
        const e = JSON.parse(localStorage.getItem("employee"));
        setEmp(e);
        const id = e.emp_id;
        axios.get(`http://localhost:8080/getPreferenceById/${id}`).then((res) => {
            console.log(res.data);
            if (res.data.success == true)
                setPref(res.data.preference);
            else
                setPref(0);
            console.log(pref);
            if (pref.length > 0) {
                setDesPerc(res.data.preference[0].disabllity_perc);
                setAge(res.data.preference[0].age);
                setGender(res.data.preference[0].gender);
                setHour(res.data.preference[0].hours_in_day);
                setStatus(res.data.preference[0].status_client);
            }
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
        let id = pref[0].idpreferences

        const obj = {
            id,
            gender,
            age,
            desPerc,
            hour,
            statusClient
        }
        axios.put("http://localhost:8080/updatePreferences", obj).then((res) => {
            console.log(res);
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
        pref.length > 0 ?
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
                                        <FormLabel component="legend">??????</FormLabel>
                                        <RadioGroup row aria-label="gender" name="row-radio-buttons-group" defaultValue={pref[0].gender == 1 ? "female" : "male"} onChange={changeGender}>
                                            <FormControlLabel value="male" control={<Radio />} label="??????" />
                                            <FormControlLabel value="female" control={<Radio />} label="????????" />
                                        </RadioGroup>
                                    </FormControl>
                                </CardContent>
                                <CardContent>
                                    <TextField
                                        id="standard-number"
                                        label="?????????? ????????"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        //pref?:
                                        defaultValue={pref[0].disabllity_perc}
                                        onChange={(e) => { setDesPerc(e.target.value); console.log(e.target.value); }}
                                    />
                                    <>                                                                                                      </>
                                    <TextField
                                        id="standard-number"
                                        label="??????"
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
                                        label="???????? ????????"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        helperText="???????????? ??????"
                                        defaultValue={pref[0].hours_in_day}
                                        onClick={(e) => { setHour(e.target.value) }} />
                                </CardContent>
                                <CardContent>

                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        ?????????? ??????????
                                    </InputLabel>
                                    <NativeSelect
                                        defaultValue={pref[0].status_client}
                                        inputProps={{
                                            name: 'age',
                                            id: 'uncontrolled-native',
                                        }}
                                        style={{ width: '20vw' }}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >   <option value={""}></option>
                                        <option value={3}>????????????</option>
                                        <option value={1}>???????????? ??????</option>
                                        <option value={2}>???????????? ????????</option>
                                    </NativeSelect>
                                </CardContent>
                                <br /><br />
                                <Grid style={{ textAlign: 'center' }}>
                                    <Button variant="contained" size="large" onClick={ChangePref} style={{ background: '#006064' }}>
                                        ??????????
                                    </Button>
                                </Grid>
                            </CardContent>

                        </Card>
                    </Grid>
                </CacheProvider>
            </Grid> :
            <Grid justify="center"
                alignItems="center"
                justifyContent="center" container spacing={1} style={{ textAlign: 'center', width: '100vw' }}>
                <Grid item sx={12}>



                    <br /><strong> ?????? ???? ????????????, ???????? ???????????? ????????????</strong>
                    <br /><br /><Button size="small" style={{ background: '#006064' }} variant="contained" size="large" onClick={() => { window.location.assign(`/employee-bar/preference`) }}>
                        ?????????? ????????????
                    </Button>

                </Grid>
            </Grid>

    );
}
export default UpdatePreference
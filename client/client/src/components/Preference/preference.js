import { Button, Card, CardActions, CardContent, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, NativeSelect, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { Box, textAlign } from "@mui/system";
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from "@emotion/react";




const Preference = () => {

    const [error, setError] = React.useState();
    const [emp_id, setEmpId] = useState();
    const [gender, setGender] = useState();
    const [desPerc, setDesPerc] = useState();
    const [age, setAge] = useState();
    const [hour, setHour] = useState();





    const theme = createTheme({
        direction: 'rtl', // Both here and <body dir="rtl">
    });
    // Create rtl cache
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [rtlPlugin],
    })
    const ChangePref = () => {
        alert("change the status")
    }
    const ifLegal = (event) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value.length != 9 || !re.test(event.target.value)) {
            setError('תעודת זהות לא תקינה')
        }
        else
            setError('')
        setEmpId(event.target.value)
    }
    const changeGender = (event) => {
        if (event.target.value == 'male')
            setGender(0);
        else
            setGender(1);
    };

    return (
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
                            <Typography variant="h5" component="div">העדפות</Typography>
                            {/* // hours_in_day, status_client, */}
                            <TextField
                                required
                                error={error}
                                id="filled-required"
                                label="תעודת זהות"
                                value={emp_id}
                                variant="standard"
                                onChange={ifLegal}
                                helperText={error}
                            />
                            <CardContent >
                                <FormControl component="fieldset" dir="rtl">
                                    <FormLabel component="legend">מין</FormLabel>
                                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={gender} onChange={changeGender}>
                                        <FormControlLabel value="female" control={<Radio />} label="זכר" />
                                        <FormControlLabel value="male" control={<Radio />} label="נקבה" />
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
                                    //value={desPerc}
                                    onClick={(e) => { setDesPerc(e.target.value) }}
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
                                    //value={desPerc}
                                    onClick={(e) => { setAge(e.target.value) }}
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
                                    //value={desPerc}
                                    onClick={(e) => { setHour(e.target.value) }} />
                            </CardContent>
                            <CardContent>

                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    סטטוס מטופל
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={""}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                    style={{width:'20vw'}}
                                >   <option value={""}></option>
                                    <option value={10}>תסמונת</option>
                                    <option value={20}>סיעודי מלא</option>
                                    <option value={30}>סיעודי חלקי</option>
                                </NativeSelect>
                            </CardContent>
                            <br /><br /> 
                            <Grid style={{ textAlign: 'center' }}>
                                <Button variant="contained" size="large" onClick={ChangePref}style={{ background: '#006064' }}>
                                    שמירה
                                </Button>
                            </Grid>
                        </CardContent>

                    </Card>
                </Grid>
            </CacheProvider>
        </Grid>
    );
}
export default Preference
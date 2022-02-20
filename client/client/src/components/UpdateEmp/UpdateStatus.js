import { Button, Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box, textAlign } from "@mui/system";
import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from "@emotion/react";




const UpdateStatus = () => {
    const theme = createTheme({
        direction: 'rtl', // Both here and <body dir="rtl">
    });
    // Create rtl cache
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [rtlPlugin],
    });
    const [why, setWhy] = React.useState('');
    const [dis, setDis] = React.useState(true);

    const handleChange = (event) => {
        if (event.target.value == 5)
            setDis(false);
        else
            setDis(true);
        setWhy(event.target.value);
    };
    const ChangeStatus=()=>{
        alert("change the status")
    }

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
                    <Card style={{ width: '50vw', height: '70vh', textAlign: 'center', align: 'center' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">שינוי סטטוס</Typography>
                            <br />
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">סיבת השינוי</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={why}
                                        label="סיבת השינוי"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={1} dir='rtl'>אישור עבודה</MenuItem>
                                        <MenuItem value={2} dir='rtl'>פטירה</MenuItem>
                                        <MenuItem value={3} dir='rtl'>החלמה</MenuItem>
                                        <MenuItem value={4} dir='rtl'>פיטורים</MenuItem>
                                        <MenuItem value={5} dir='rtl'>אחר</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <br /><br />
                            <TextField disabled={dis} id="standard-basic" label="פירוט" variant="standard" />


                            <br /><br /> <br /><br /> <br /><br />
                            <Grid style={{ textAlign: 'center' }}>
                                <Button variant="contained" size="large" onClick={ChangeStatus}>
                                    שינוי
                                </Button>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </CacheProvider>
        </Grid>
    );
}
export default UpdateStatus
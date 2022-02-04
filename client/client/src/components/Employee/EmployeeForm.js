import { Autocomplete, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material';
import { Box, minWidth } from '@mui/system';
import React, { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import {cities} from './../../assets/cities.json';

const EmployeeForm = () => {

  const [emp_id, setEmpId] = useState();
  const [typeRec, setTypeRec] = useState('');
  const [error, setError] = useState('');
  const [errorNum, setErrorNum] = useState('');
  const userStr = localStorage.getItem("user");
  const user = JSON.parse(userStr);
  const [end_visa_period, setEndVisaPeriod] = useState();
  const [kind, setKind] = useState();
  const [gender, setGender] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [number, setNumber] = useState();
  const [preNumber, setPreNumber] = useState('None');
  const [birth_date, setBirthDate] = useState();

  const citiesNames = cities.city.map(c=>c.hebrew_name);

  const [disabled, setDisabled] = React.useState(true);
  const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
  });
  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
  });

  const ifLegal = (event) => {
    const re = /^[0-9\b]+$/;
    if (typeRec == 'id')
      if (event.target.value.length != 9 || !re.test(event.target.value)) {
        setError('תעודת זהות לא תקינה')
      }
      else
        setError('')
    else {
      if (!re.test(event.target.value))
        setError('לא תקין')
    }
    setEmpId(event.target.value)
  };
  const changeKind = (event) => {
    if (event.target.value == 'zar')
      setKind(2);
    else
      setKind(1);
  };
  const changeGender = (event) => {
    if (event.target.value == 'male')
      setGender(0);
    else
      setGender(1);
  };
  const defaultProps = {
    options: citiesNames,
    getOptionLabel: (option) => option,
  };
  // const flatProps = {
  //   options: top100Films.map((option) => option.title),
  // };
  const ifNum = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value.length != 7 || !re.test(event.target.value)) {
      setErrorNum('מספר טלפון לא תקין')
      setNumber(preNumber + event.target.value);
    }
    else {
      setErrorNum('')
      setNumber('');
    }

  };
  const saveEmp = () => {
    alert('save the emp in db and save lockal storage');
    window.location.assign('http://localhost:3000/employee-bar');
  }
  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
    saveEmp();
  }


  return (
    <CacheProvider value={cacheRtl}>
      <Box
        dir='rtl'
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
        noValidate
        autoComplete="off"
      //  textAlign="center"
      >
        {/* //-emp_id, -last_name, -first_name, -end_visa_period, -type, status_emp, 
          //-genus, -address, -city, -phone, password, mail, birth_date */}

        <FormControl component="fieldset">
          <FormLabel component="legend">בחר אמצעי זיהוי</FormLabel>
          <RadioGroup row aria-label="rec" name="row-radio-buttons-group" drawableRight>
            <FormControlLabel value="id" control={<Radio />} label="תעודת זהות" onChange={(e) => { setTypeRec(e.target.value) }} />
            <FormControlLabel value="passport" control={<Radio />} label="מספר דרכון" onChange={(e) => { setTypeRec(e.target.value) }} />
          </RadioGroup>
        </FormControl>
        <br />
        <TextField
          required
          error={error}
          id="filled-required"
          label={typeRec}
          value={emp_id}
          variant="standard"
          onChange={ifLegal}
          helperText={error}
        />

        <div>
          <TextField

            required
            id="filled-required"
            label="שם פרטי"
            // value={emp_id}
            variant="standard"
            defaultValue={user.firstName}
          />
          <TextField
            required
            id="filled-required"
            label="שם משפחה"
            // value={emp_id}
            variant="standard"
            defaultValue={user.lastName}
          />
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker

              required
              label="תאריך סיום אשרה"
              value={end_visa_period}
              onChange={(e) => { setEndVisaPeriod(e) }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

        <FormControl component="fieldset">
          <FormLabel component="legend">בחר סוג עובד</FormLabel>
          <RadioGroup row aria-label="rec" name="row-radio-buttons-group" value={kind} onChange={changeKind}>
            <FormControlLabel value="matav" control={<Radio />} label="עובד מט''ב" />
            <FormControlLabel value="zar" control={<Radio />} label="עובד זר" />
          </RadioGroup>
        </FormControl>
        <br />
        <FormControl component="fieldset">
          <FormLabel component="legend">מין</FormLabel>
          <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={gender} onChange={changeGender}>
            <FormControlLabel value="female" control={<Radio />} label="זכר" />
            <FormControlLabel value="male" control={<Radio />} label="נקבה" />
          </RadioGroup>
        </FormControl>

        <div>
          <Autocomplete
            {...defaultProps}
            id="disable-close-on-select"
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField {...params} label="עיר" variant="standard" value={city} onChange={(e) => { setCity(e.target.value) }} />

            )} />
          <Autocomplete
            {...defaultProps}
            id="disable-close-on-select"
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField {...params} label="רחוב" variant="standard" value={address} onChange={(e) => { setAddress(e.target.value) }} />

            )} />
        </div>
        <div  >
          {/* sx={{ minWidth: 120 }
        <Grid sx={minWidth}> */}
          <TextField
            dir='ltr'
            required
            error={errorNum}
            id="filled-required"
            label="מספר טלפון"
            value={number}
            variant="standard"
            onChange={ifNum}
            helperText={errorNum}
          />
          <FormControl  >
            <InputLabel id="demo-simple-select-label">קידומת</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={preNumber}
              label="קידומת"
              onChange={(e) => { setPreNumber(e.target.value) }}>
              <MenuItem value={'050'}>050</MenuItem>
              <MenuItem value={'052'}>052</MenuItem>
              <MenuItem value={'053'}>053</MenuItem>
              <MenuItem value={'054'}>054</MenuItem>
              <MenuItem value={'055'}>055</MenuItem>
              <MenuItem value={'057'}>057</MenuItem>
              <MenuItem value={'058'}>058</MenuItem>
              {/* <MenuItem value={058}>058</MenuItem> */}
            </Select>
          </FormControl>
          {/* </Grid> */}

        </div>
        <TextField
          required
          id="filled-required"
          label="מייל"
          variant="standard"
          defaultValue={user.email}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            required
            label=" תאריך לידה"
            value={birth_date}
            onChange={(e) => { setBirthDate(e) }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <br />
        <LoadingButton
          color="secondary"
          onClick={handleClick}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          שמור
        </LoadingButton>
      </Box>
    </CacheProvider>

    /* <Button variant="outlined">שמור</Button> */



  );
}

export default EmployeeForm

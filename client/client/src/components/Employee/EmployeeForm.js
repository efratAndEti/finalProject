import { Alert, AlertTitle, Autocomplete, Button, Card, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Snackbar, Stack, TextField } from '@mui/material';
import { Box, minWidth, textAlign } from '@mui/system';
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
import { cities } from './../../assets/cities.json';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import MultipleSelectChip from './Days';
import { TimePicker } from '@mui/lab';
import MultipleSelectCheckmarks from './languages';

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

  const [start, setStart] = useState();
  const [stop, setStop] = useState();

  const citiesNames = cities.city.map(c => c.hebrew_name);

  const [disabled, setDisabled] = useState(true);
  const saveFile = () => {
    let file = document.getElementById("user-file").files
    console.log("files", file);
    console.log("files1", file[0]);
    var htmlContent = [file[0]];
    var bl = new Blob(htmlContent, { type: "text/html" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(bl);
    a.download = "./../../assets/files/userFile.html";
    a.hidden = true;
    document.body.appendChild(a);
  }
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
        setError('?????????? ???????? ???? ??????????')
      }
      else
        setError('')
    else {
      if (!re.test(event.target.value))
        setError('???? ????????')
    }
    setEmpId(event.target.value)
  };
  const changeKind = (event) => {
    if (event.target.value == 'zar') {
      setKind(2);
      setDisabled(true);
    }
    else {
  setKind(1);
  setDisabled(false);
}

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
  if (!re.test(event.target.value)) {
    setErrorNum('???????? ?????????? ???? ????????')

  }
  else {
    setErrorNum('')

  }
  setNumber(event.target.value);

};
const saveEmp = () => {
  const last_name = user[0].last_name;
  const first_name = user[0].first_name;
  const mail = user[0].user_name;
  const user_id = user[0].id;
  const password = user[0].password;
  const body = { emp_id, last_name, first_name, end_visa_period, kind, gender, address, city, number, password, mail, birth_date, user_id }
  console.log(body);
  //addLanguage
  axios.post('http://localhost:8080/addEmployee', body).then((res) => {
    console.log(res);
    const result = res.data;
    if (result.success == false) {
      alert(result.massage);
      return;
    }
    alert(city);
    alert(address);
    const empStr = JSON.stringify(body);
    localStorage.setItem("employee", empStr);
    console.log(body);
  })
  for(let l=0;l<lang.length;l++){
    let obj={emp_id,language:lang[l]}
    console.log(obj);
    axios.post('http://localhost:8080/addLanguage',obj ).then((res) => {
      console.log(res);
      const resultLan = res.data;
      if (resultLan.success == false) {
        alert(resultLan.massage);
        return;
    }})
  }
  if(kind==1){
  for(let l=0;l<days.length;l++){
    let d={emp_id,day:days[l] ,start,stop}
    console.log(days[l]);
    console.log(d);
    axios.post('http://localhost:8080/addDayOfMatav',d ).then((res) => {
      console.log(res);
      const resultLan = res.data;
      if (resultLan.success == false) {
        alert(resultLan.massage);
        return;
    }})}
  }
  alert('save the emp in db and save lockal storage');
  window.location.assign('http://localhost:3000/employee-bar');
}
// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
const Input = styled('input')({
  display: 'none',
});
const [open, setOpen] = useState(true);
const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};
const [loading, setLoading] = React.useState(false);
function handleClick() {

  if (!emp_id) {
    <Snackbar open='true' autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>

        This is a success message!
      </Alert>
    </Snackbar>

    return
  }
  setLoading(true);
  saveEmp();
}
const [days, setDays] = useState([]);
const handleDays = (e) => {
  
  console.log(e);
  let temp=e;
  for(let i=0;i<e.length;i++){
    // alert('in for');
    // alert('e:'+e[i]+' temp: '+temp[i]);
    switch(e[i]) { 
    case '??????????':{temp[i]=1;break;}
    case '??????':{temp[i]=2;break;}
    case '??????????':{temp[i]=3;break;}
    case '??????????':{temp[i]=4;break;}
    case '??????????':{temp[i]=5;break;}
    case '????????':{temp[i]=6;break;}}
  }
  console.log(temp);
  setDays(temp);
}
const [lang, setLang] = useState([]);
const handleLang = (e) => {
  console.log(e);
  setLang(e);
}


return (
  <CacheProvider value={cacheRtl}>
    <Grid container
      // spacing={15}
      columns={15}
      padding={3}>


      {/* <Box
          dir='rtl'
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
          noValidate
          autoComplete="off"
        //  textAlign="center"
        > */}
      {/* //-emp_id, -last_name, -first_name, -end_visa_period, -type, status_emp, 
          //-genus, -address, -city, -phone, password, mail, birth_date */}
      <Grid item sx={5} dir='rtl' >
        <Card style={{ width: '30vw' ,textAlign:'center' ,height: '80.6vh'}}>

          ???????? ????''??
          <MultipleSelectChip handleDays={handleDays} disabled={disabled} />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              disabled={disabled}
              label="?????? ??????????"
              value={start}
              onChange={(newValue) => {
                setStart(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br /> <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              disabled={disabled}
              label="?????? ????????"
              value={stop}
              onChange={(newValue) => {
                setStop(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br/> <br/>
          <MultipleSelectCheckmarks handleLang={handleLang} />
          <br/>
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <Button variant="outlined" component="span" style={{ color: 'rgb(0 151 167)' }}>
              ?????????? ???????? ????????????
            </Button>
          </label>
          <br/><br/>
          <LoadingButton
            color="secondary"
            onClick={handleClick}
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            style={{ background: 'rgb(0 151 167)' }}
          >
            ????????
          </LoadingButton>
        </Card>
      </Grid>
      <Grid item sx={10} dir='rtl' >
        <Card style={{ width: '60vw'}}>
          <FormControl component="fieldset">
            <FormLabel component="legend">?????? ?????????? ??????????</FormLabel>
            <RadioGroup row aria-label="rec" name="row-radio-buttons-group" drawableRight>
              <FormControlLabel value="id" control={<Radio />} label="?????????? ????????" onChange={(e) => { setTypeRec(e.target.value) }} />
              <FormControlLabel value="passport" control={<Radio />} label="???????? ??????????" onChange={(e) => { setTypeRec(e.target.value) }} />
            </RadioGroup>
          </FormControl>
          <>                                                                                                                                       </>
          <FormControl component="fieldset">
            <FormLabel component="legend">?????? ?????? ????????</FormLabel>
            <RadioGroup row aria-label="rec" name="row-radio-buttons-group" value={kind} onChange={changeKind}>
              <FormControlLabel value="matav" control={<Radio />} label="???????? ????''??" />
              <FormControlLabel value="zar" control={<Radio />} label="???????? ????" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">??????</FormLabel>
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={gender} onChange={changeGender}>
              <FormControlLabel value="female" control={<Radio />} label="??????" />
              <FormControlLabel value="male" control={<Radio />} label="????????" />
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
              label="???? ????????"
              // value={emp_id}
              variant="standard"
              defaultValue={user[0].first_name}
              //onChange={(e)=>{console.log(user);}}
            />
            <TextField
              required
              id="filled-required"
              label="???? ??????????"
              // value={emp_id}
              variant="standard"
              defaultValue={user[0].last_name}
            />
          </div>
          <br />
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker

                required
                label="?????????? ???????? ????????"
                value={end_visa_period}
                onChange={(e) => { setEndVisaPeriod(e) }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>


          <div>
            <Autocomplete
              {...defaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField {...params} label="??????" variant="standard" value={city} onChange={(e) => { setCity(e.target.value.hebrew_name) }} />

              )} />
            <Autocomplete
              {...defaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField {...params} label="????????" variant="standard" value={address} onChange={(e) => { setAddress(e.target.value) }} />

              )} />
          </div>

          {/* sx={{ minWidth: 120 }
        <Grid sx={minWidth}> */}
          <br />
          <TextField
            dir='ltr'
            required
            error={errorNum}
            id="filled-required"
            label="???????? ??????????"
            value={number}
            variant="standard"
            onChange={ifNum}
            helperText={errorNum}
          />


          <TextField
            required
            id="filled-required"
            label="????????"
            variant="standard"
            defaultValue={user[0].user_name}
          />
          <br/><br/>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              required
              label=" ?????????? ????????"
              value={birth_date}
              onChange={(e) => { setBirthDate(e) }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Card>
      </Grid>


    </Grid>
  </CacheProvider>
);
}

export default EmployeeForm

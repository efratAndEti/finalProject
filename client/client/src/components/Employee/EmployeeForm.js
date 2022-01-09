import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const EmployeeForm =()=>{
         
    const [emp_id,setEmpId]=useState();
    const [typeRec,setTypeRec]=useState('');
    const [error,setError]=useState('');

    const ifLegal= (event)=>{
        const re = /^[0-9\b]+$/;
        if(typeRec=='id')
            if(event.target.value.length!=9 || !re.test(event.target.value)){
                setError('תעודת זהות לא תקינה')
            }
            else
                setError('')
        else{
            if(!re.test(event.target.value))
            setError('לא תקין')
        } 
        setEmpId(event.target.value)   
        }

    return(
        <Box
        component="form"
        sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
        noValidate
        autoComplete="off"
        >
          {/* //emp_id, last_name, first_name, end_visa_period, type, status_emp, 
          //genus, address, city, phone, password, mail, birth_date */}
            <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">בחר אמצעי זיהוי</FormLabel>
                <RadioGroup row aria-label="rec" name="row-radio-buttons-group">
                    <FormControlLabel value="id" control={<Radio />} label="תעודת זהות" onChange={(e)=>{setTypeRec(e.target.value)}}/>
                    <FormControlLabel value="passport" control={<Radio />} label="מספר דרכון" onChange={(e)=>{setTypeRec(e.target.value)}} />
                </RadioGroup>
            </FormControl>
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
            </div>
            <div>
                <TextField
                required
                id="filled-required"
                label="שם פרטי"
                // value={emp_id}
                variant="standard"
                defaultValue="here the first name from the user"
                />
                <TextField
                required
                id="filled-required"
                label="שם משפחה"
                // value={emp_id}
                variant="standard"
                defaultValue="here the last name from the user"
                />
            </div>
        </Box>
    );
}
export default EmployeeForm
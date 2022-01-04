import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function ControlledRadioButtonsGroup() {
    const [value, setValue] = React.useState('');
  
    
    const handleChange = (event) => {
      setValue(event.target.value);

    };
    

  
    return (
      <FormControl component="fieldset">
       {/* <FormLabel component="legend">סוג</FormLabel> */}
        <RadioGroup
          aria-label="kind"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="client" control={<Radio />} label="מטופל" />
          <FormControlLabel value="employee" control={<Radio />} label="עובד" />
        </RadioGroup>
      </FormControl>
    );
  }
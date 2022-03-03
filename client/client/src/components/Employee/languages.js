import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { languages } from './../../assets/languages.json';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function MultipleSelectCheckmarks(props) {
  const [personName, setPersonName] = React.useState([]);
  //const [language,setLanguage]=React.useState();
  const {handleLang}=props;
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    handleLang(typeof value === 'string' ? value.split(',') : value,);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">בחר שפה</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
            {/* //{languages.map(l => <option value={l.english_name}>{l.hebrew_name}</option>)} */}
            {/* languages.sort() */}
          {languages.sort().map((name) => (
            <MenuItem key={name} value={name.english_name}>
              <Checkbox checked={personName.indexOf(name.english_name+' '+ name.hebrew_name) > -1} />
              <ListItemText primary={name.english_name+' '+ name.hebrew_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
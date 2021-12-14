import React, { useEffect, useState } from 'react';
import Custumer from '../Custumer/Custumer';
import { getClientsByStatus } from '../../services/client.service';
import axios from 'axios';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getStatuses } from '../../services/status.service';

export default function Sample() {
    // “count” חדש, אשר נקרא state הצהר על משתנה
    const [clients, setClients] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [status, setStatus] = useState(0);

    useEffect(async () => {
        console.log("getting data from server");

        const clients = await getClientsByStatus(status);
        if (clients != null)
            setClients(clients);
        else
            alert("server Errror! , client");

        const statuses = await getStatuses();
        if (statuses != null)
        {
            console.log(statuses);
            setStatuses(statuses);
        }
        else
            alert("server Errror!  , status");

    }, [])


    const handleChange = (event) => {
        console.log(event.target.value);
        setStatus(event.target.value);
    };
    return (
        <div>
            {/* <input onChange={(e) => { setStatus(e.target.value); console.log(e.target.value);  }} 
                    value={status} /> */}

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Age"
                        onChange={handleChange}
                    >
                        {statuses.map( s => <MenuItem value={s.id_status}>{s.status_type}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>


            <div>
                <h2>here are all clients in status 0</h2>
                <div>
                    {clients.map((c) => <Custumer c={c} />)}
                </div>
            </div>
            <Button variant="contained">Hello World</Button>;
        </div>
    );
}

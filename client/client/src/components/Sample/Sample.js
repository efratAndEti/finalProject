import React, { useEffect, useState } from 'react';
import Custumer from '../Custumer/Custumer';
import {getClientsByStatus}  from '../../services/client.service';
import axios from 'axios';

export default function Sample() {
    // “count” חדש, אשר נקרא state הצהר על משתנה
    const [count, setCount] = useState(0);
    const [clients, setClients] = useState([]);
    const [status, setStatus] = useState("");
    useEffect( async () => {
        console.log("getting data from server");
        console.log(status);
        const clients = await getClientsByStatus();
        if(clients!=null)
            setClients(clients);
        else
            alert("server Errror!");
    }, [status])



    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            <br />
            <hr />
            <br />
            <input onChange={(e) => { setStatus(e.target.value); console.log(e.target.value);  }} 
                    value={status} />
            <div>
                <h2>here are all clients in status 0</h2>
                <div>
                    {clients.map((c) => <Custumer c={c} />)}
                </div>
            </div>

        </div>
    );
}

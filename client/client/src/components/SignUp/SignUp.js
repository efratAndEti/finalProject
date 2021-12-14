import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import './SignUp.css';

export default function SignUp() {

    const [from_m, setFrom_m] = useState('');
    const [to_m, setTo_m] = useState('');


    const SignUp = () => {
        const body = {
            from_m, 
            to_m
        }
        console.log("adding the massage", body);
        axios.post('http://localhost:8080/addMassage', body).then((res) => {
            console.log(res);
        })
    }

    return (
        <div>
            <form >
                <input value={from_m} onChange={(e) => { setFrom_m(e.target.value) }} />
                <input value={to_m} onChange={(e) => { setTo_m(e.target.value) }} />
                <input type="button" onClick={SignUp} value="send massage" />
            </form>
        </div>
    )
}
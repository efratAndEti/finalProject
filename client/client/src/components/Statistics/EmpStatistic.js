
import axios from 'axios';
import { useState, useEffect } from 'react';


const EmpStatistic =()=>{
useEffect(()=>{
    alert('Im here')
    axios.get(`http://localhost:8080/EmpStatistic`).then((res) => {
        console.log(res.data);

    })
},[])
return(
<div>here the emp statictis</div>
);
}
export default EmpStatistic;
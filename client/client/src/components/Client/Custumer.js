
import React, { useState } from 'react';

export default function Custumer(props) {

    const { c } = props;
    console.log(c)
    const { first_name, last_name } = c;
    return (
        <div>
            <p>{first_name}</p>
            <p>{last_name}</p>
        </div>
    )
}
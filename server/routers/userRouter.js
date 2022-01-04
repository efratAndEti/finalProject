const express = require('express');
const userRouter = express.Router();

const { getUsers } = require('../actions/userActions');
const { promiseQuery } = require('../sql/sql');



userRouter.get('/getUsers', async (req, res) => {

    // console.log("arrived to client");
    // console.log("arrived to clientid");
    const { result, err } = await getUsers();
    if (!err)
        res.send(result);
    else
        console.log(err);
    res.send(err);

})
module.exports = { userRouter }

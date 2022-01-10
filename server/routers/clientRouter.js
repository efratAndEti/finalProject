const express = require('express');
const clientRouter = express.Router();

const { getClientById } = require('../actions/clientActions');
const { promiseQuery } = require('../sql/sql');


clientRouter.get('/getClient/:clientId', async (req, res) => {

    console.log("arrived to client");
    console.log("arrived to clientid")
    const { clientId } = req.params;
    const { result, err } = await getClientById(clientId);
    if (!err)
        res.send(result);
    else
        console.log(err);
    res.send(err);

})


clientRouter.get('/findClientByStatus', async (req, res) => {    
    const { statusId } = req.params;
    const result =await promiseQuery(`SELECT first_name , last_name  FROM client `);
    console.log("Result of status" ,result);
    res.send(result);
})

clientRouter.post("/addClient", (req, res) => {
    console.log(req.body);
    const { first_name } = req.body;
    const { id } = req.body;
    const { last_name } = req.body;
    const { birthDate } = req.body;
    const { disability_perc } = req.body;
    const { eligibility_hours } = req.body;
    const { client_status } = req.body;
    const { history } = req.body;
    const { gender } = req.body;
    const { phone } = req.body;
    const { address } = req.body;
    const { city } = req.body;
    const { mail } = req.body;
    const { password } = req.body;
    const { Degree_of_nursing } = req.body;
    const { Hours_out } = req.body;
    const { hours_out_price } = req.body;
    mysqlConnection.query(`insert into db.client values(${id}, ${last_name},${first_name},${birthDate},${disability_perc},${eligibility_hours},${client_status},${history},${gender},${phone},${mail},${address},${city},${password}, ${Degree_of_nursing}, ${Hours_out}, ${hours_out_price});`, (err, result) => {
        if (!err) {
            console.log(result);
            res.send({ succes: true, insertId: result.insertId });
        }
        else
            res.send(err);
    })
}
)


clientRouter.put("/updateStatus/:id", (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    mysqlConnection.query(`UPDATE client SET client_status = '${status}' WHERE id_client=${id};`, (err, result) => {
        if (!err) {
            console.log(result);
            res.send({ succes: true, insertId: result.insertId });
        }
        else
            res.send(err);
    })
})

module.exports = clientRouter;
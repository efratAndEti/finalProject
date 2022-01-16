const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const { promiseQuery } = require('./sql/sql')
const clientRouter = require('./routers/clientRouter');
const userRouter = require('./routers/userRouter'); 


const app = express();
app.use(bodyparser.json());
app.use(cors());

app.use('/client', clientRouter)
//app.use('/user', userRouter)

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));




app.get("/status/getStatuses", async (req, res)=>{
            const status = await promiseQuery("SELECT * FROM status");
            res.send(status);
})
app.get("/getUsers", async (req, res)=>{
    const status = await promiseQuery("SELECT * FROM users");
    res.send(status);
})
app.get("/getEmployee", async (req, res)=>{
    const status = await promiseQuery("SELECT * FROM employee");
    res.send(status);
})
app.post("/addUser", async (req,res)=> {
    const { email, password, kind ,lastName,firstName,date }=req.body;
    const query= `insert into db.users(user_name, password, user_kind, last_name, first_name,date) values('${email}','${password}','${kind}','${lastName}','${firstName}','${date}')`
    await promiseQuery(query, (err, result) => {
        if (!err) {
            console.log(result);
            res.send({ succes: true, insertId: result.insertId });
        }
        else
            res.send(err);

    })

})
app.post(("/addMassage"), async (req, res) => {
    // var x = new Date();
    const { from_m } = req.body;
    const { to_m } = req.body;
    //const { title, content } = req.body;
    const query = `insert into db.messages (from_m, to_m, title, content, date, ifRead) values('${from_m}','${to_m}','cdc','dcdc',curdate(),1);`;
    console.log(query);
    await promiseQuery(query, (err, result) => {
        if (!err) {
            console.log(result);
            res.send({ succes: true, insertId: result.insertId });
        }
        else
            res.send(err);

    })
})



// //----------------שינוי!!!!!!!!!!!!!!!!!!!!
// app.get('/find', (req, res) => {
//     console.log(req.query);
//     console.log(req.params);

// })
app.post("/addEmployee", async(req, res) => {
    const { emp_id, last_name, first_name, end_visa_period, type,
        status_emp, gender, address, city, phone, password, mail, birth_date } = req.body;
    const query = `insert into db.employee values('${emp_id}', '${last_name}', '${first_name}', '${end_visa_period}'
    , ${type}, ${status_emp}, ${gender}, '${address}', '${city}', '${phone}', '${password}','${mail}', '${birth_date}'`;

    console.log(query);
    await promiseQuery(`insert into db.employee values('${emp_id}', '${last_name}', '${first_name}', '${end_visa_period}'
            , ${type}, ${status_emp}, ${gender}, '${address}', '${city}', '${phone}', '${password}','${mail}', '${birth_date}');`, (err, result) => {
        if (!err) {
            console.log(result);
            res.send({ succes: true, insertId: result.insertId });
        }
        else
            res.send(err);
    })
})





// /*
// app.put("/updateUser/:id", (req, res) => {
//     console.log(req.body);
//     const { name } = req.body;
//     const { id } = req.params;
//     mysqlConnection.query(`UPDATE users SET name = '${name}' WHERE id=${id};`, (err, result) => {
//         if (!err) {
//             console.log(result);
//             res.send({ succes: true, insertId: result.insertId });
//         }
//         else
//             res.send(err);
//     })
// })

// app.delete("/deleteUser/:id", (req, res) => {
//     const { id } = req.params;
//     mysqlConnection.query(`DELETE FROM users WHERE id=${id};`, (err, result) => {
//         if (!err) {
//             console.log(result);
//             res.send({ succes: true, insertId: result.insertId });
//         }
//         else
//             res.send(err);
//     })
// })
// */


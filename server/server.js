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


//---------------------------------------------status---------------------


app.get("/status/getStatuses", async (req, res) => {
    const status = await promiseQuery("SELECT * FROM status");
    res.send(status);
})


//---------------------------------------------employee---------------------


app.get("/getEmployee", async (req, res) => {
    const status = await promiseQuery("SELECT * FROM employee");
    res.send(status);
})
app.get("/getEmployeeByUserId/:id", async (req, res) => {
    const { id } = req.params;
    const empDetails = await promiseQuery(`SELECT * FROM employee WHERE  user_id = '${id}'`);
    if (empDetails.length == 0)
        res.send(null);
    else
        res.send(empDetails[0]);
})

//---------------------------------------------massage---------------------

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


//---------------------------------------------opinion---------------------

// app.get("/getOpinions", async (req, res) => {
//     const status = await promiseQuery("SELECT * FROM opinion");
//     res.send(status);
// })


app.post(("/addOpinion"), async (req, res) => {
    const { client, emp, rank, desc } = req.body;
    const query = `insert into db.opinion  values(0,'${client}','${emp}',${rank},'${desc}');`;
    console.log(query);
    await promiseQuery(query, (err, result) => {
        if (!err) {
            console.log(result);
            res.send({ success: true, insertId: result.insertId });
        }
        else {
            console.log("error");
            res.send(err);

        }

    })
})
// //----------------שינוי!!!!!!!!!!!!!!!!!!!!
// app.get('/find', (req, res) => {
//     console.log(req.query);
//     console.log(req.params);

// })
app.get("/getOpinion", async (req, res) => {
    await promiseQuery(`select * from opinion`)
})

app.get("/getOpinionById/:id", async (req, res) => {

    const { id } = req.params;
    const query = `SELECT o.* , first_name, last_name
    FROM opinion  o JOIN client c ON o.clientId = c.id_client
    WHERE empId = '${id}'`;
    const opinions = await promiseQuery(query);
    res.send(opinions);
})

app.get("/getAvgOpinions", async (req, res) => {

    const query = `
    SELECT e.emp_id, e.first_name as 'first_name' ,e.last_name as 'last_name', AVG(o.rank) as 'avg'
    FROM opinion  o JOIN employee e ON o.empId = e.emp_id
    GROUP BY o.empId, e.first_name, e.last_name`;
    const opinions = await promiseQuery(query);
    res.send(opinions);
})

app.post("/addEmployee", async (req, res) => {
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



//---------------------------------------------user---------------------
app.get("/getUsers", async (req, res) => {
    const status = await promiseQuery("SELECT * FROM users");
    res.send(status);
})

app.post("/addUser", async (req, res) => {
    //בדיקה ששם משתמש לא קיים
    const { email, password, kind, lastName, firstName, date } = req.body;
    const users = await promiseQuery(`select user_name from users where user_name='${email}'`);
    if (users.length > 0) {
        console.log("email exisits");
        res.send({ success: false, massage: "שם משתמש קיים" });
    }
    else {


        const query = `insert into db.users(user_name, password, user_kind, last_name, first_name,date) values('${email}','${password}','${kind}','${lastName}','${firstName}','${date}')`
        await promiseQuery(query, (err, result) => {
            if (!err) {
                console.log(result);
                res.send({ success: true, insertId: result.insertId });

            }
            else
                res.send(err);


        })
    }
})


app.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    const query = `SELECT * FROM users WHERE user_name = '${userName}'`;
    console.log(query);

    try {
        const rows = await promiseQuery(query);
        if (rows.length == 0)
            res.send({ success: false, massage: "שם משתמש לא תקין" });

        else {
            const user = rows[0];
            if (user.password != password)
                res.send({ success: false, massage: "סיסמא שגויה" });
            else
                res.send({ success: true, user: user });

        }
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
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

//---------------------------------------------client---------------------

app.get("/getClientByUserId/:id", async (req, res) => {
    const { id } = req.params;
    const empDetails = await promiseQuery(`SELECT * FROM client WHERE  user_id = '${id}'`);
    if (empDetails.length == 0)
        res.send(null);
    else
        res.send(empDetails[0]);
})
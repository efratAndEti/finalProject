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

app.post("/addEmployee", async (req, res) => {
    const { emp_id, last_name, first_name, end_visa_period, kind, gender, address, city, number, password, mail, birth_date, user_id } = req.body;
    const query = `insert into db.employee values('${emp_id}', '${last_name}', '${first_name}', '2027-04-04'
    , ${kind}, 3, ${gender}, 'אלמוד', 'ירושלים', '${number}', '${password}','${mail}', '1967-04-04', '${user_id}')`;

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
    const { from_m, to_m, title, content, kind } = req.body;

    //const { title, content } = req.body;
    const query = `insert into db.messages (from_m, to_m, title, content, date, ifRead, kind) values('${from_m}','${to_m}','${title}','${content}',curdate(),0, '${kind}');`;
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

app.post(("/addSystemMassage"), async (req, res) => {
    // {id:"", first_name:"", last_name:""}
    const { from_m, to_m, kind } = req.body;

    const massagesText = {
        "startTry": {
            title: "הוזמנת לראיון!",
            content: `${from_m.first_name + ' ' + from_m.last_name} הזמין אותך לראיון! תוכל ליצור איתו קשר ע''י הצאט או בכל דרך אחרת`
        },
        "inviteFail": {
            title: "ביטול ראיון",
            content: `מסיבה כלשהיא ${from_m.first_name + ' ' + from_m.last_name} לא מעוניין להגיע לראיון.לברור תוכל לפנות למנהל המערכת`
        },
        "inviteSuccess": {
            title: "הראיון אושר!",
            content: `  ${from_m.first_name + ' ' + from_m.last_name}  מעוניין להגיע לראיון. תוכל ליצור אית וקשר ע''י הצאט `
        },
        "checkClientOK": {
            title: "הלקוח מרוצה ממך!",
            content: `${from_m.first_name + ' ' + from_m.last_name} מעוניין שתמשיך להגיע אליו באופן קבוע. האם אתה מעוניין?`
        },
        "checkEmpOK": {
            title: `${from_m.first_name + ' ' + from_m.last_name} מעוניין להמשיך!`,
            content: "האם תרצה לאשר את עבודתך אצלו?"
        },
        "tryFail": {
            title: "הפסקת העסקה",
            content: `${from_m.first_name + ' ' + from_m.last_name} מעוניין להפסיק את קשר העבודה`
        },
        "trySuccess": {
            title: "המשך קשר נעים!!!",
            content: "!אני שמחים לבשר כי שני הצדדים מעוניינים בהמשך ההעסקה. ברכותינו"
        }
    }

    console.log(from_m);
    console.log(to_m);
    const m = {
        from_m: from_m.id,
        to_m: to_m.id,
        title: massagesText[kind].title,
        content: massagesText[kind].content,
        date: kind == "checkClientOK" || kind == "checkEmpOK" ? "ADDDATE(now(), INTERVAL 14 DAY)" : "curdate()",
        kind: kind
    }
    console.log(m);

    //const { title, content } = req.body;
    const query = `insert into db.messages (from_m, to_m, title, content, date, ifRead, kind) values('${m.from_m}','${m.to_m}','${m.title}','${m.content}',${m.date},0, '${m.kind}');`;
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

//שליפת הודעות ללקוח ע''פ קוד (שליפת העובד שקשור אליו וההודעות שקושורות לשניהם)


app.get('/getMassagesById/:id', async (req, res) => {
    const { id } = req.params;

    let currentUser;        //המשתמש הנוכחי 
    let otherUser;   //המשתמש שאיתו מתקשר
    let massages;    //מערך ההודעות

    // שליפת פרטי הלקוח / עובד
    const query1 = `SELECT * FROM client WHERE id_client=${id}`;
    let result = await promiseQuery(query1);  //ניסיון למצוא את הקוד בטבלת לקוחות
    if (result.length > 0) //המשתמש נשלף מטבלת לקוחות
    {

        const empQuery = `SELECT *  
                          FROM employee_to_client etc JOIN  employee e ON etc.emp_id = e.emp_id  
                          WHERE client_id = '${id}' AND end_date IS  null `;
        const empResult = await promiseQuery(empQuery);   //שליפת עובד שבקשר עם לקוח
        if (empResult.length == 0)   //אם לא קיים כזה עובד-  אין תקשורת
        {
            currentUser = {
                id: result[0].id_client,
                name: result[0].first_name + " " + result[0].last_name
            };
            otherUser = null;
            massages = [];
            res.send({ currentUser, otherUser, massages });
        }
        else {
            currentUser = {
                id: result[0].id_client,
                name: result[0].first_name + " " + result[0].last_name
            };
            otherUser = {
                id: empResult[0].emp_id,
                name: empResult[0].first_name + " " + empResult[0].last_name
            };

            const massagesQuery = `SELECT * FROM messages WHERE from_m = '${currentUser.id}' AND to_m = '${otherUser.id}'    OR from_m = '${otherUser.id}' AND to_m = '${currentUser.id}' `
            const massages = await promiseQuery(massagesQuery); //שליפת רשימת הודעות משותפת

            res.send({ currentUser, otherUser, massages });
        }

    }
    else {
        const query2 = `SELECT * FROM employee WHERE emp_id=${id}`;
        result = await promiseQuery(query2);
        console.log(result);
        if (result.length == 0) {
            res.send("error");
        }
        else {


            const clientQuery = `SELECT *  
                          FROM employee_to_client etc JOIN client c ON etc.client_id = c.id_client 
                          WHERE emp_id = '${id}' AND end_date IS  null `;
            const clientResult = await promiseQuery(clientQuery);   //שליפת לקוח שבקשר עם עובד
            if (clientResult.length == 0)   //אם לא קיים כזה לקוח-  אין תקשורת
            {
                currentUser = {
                    id: result[0].emp_id,
                    name: result[0].first_name + " " + result[0].last_name
                };
                otherUser = null;
                massages = [];
                res.send({ currentUser, otherUser, massages });
            }
            else {
                currentUser = {
                    id: result[0].emp_id,
                    name: result[0].first_name + " " + result[0].last_name
                };
                otherUser = {
                    id: clientResult[0].id_client,
                    name: clientResult[0].first_name + " " + clientResult[0].last_name
                };

                const massagesQuery = `SELECT * FROM messages WHERE from_m = '${currentUser.id}' AND to_m = '${otherUser.id}'    OR from_m = '${otherUser.id}' AND to_m = '${currentUser.id}' `
                const massages = await promiseQuery(massagesQuery); //שליפת רשימת הודעות משותפת

                res.send({ currentUser, otherUser, massages });
            }
        }
    }
})

app.get('/getManagerMassagesById/:id', async (req, res) => {


})

app.get('/getMassagesToManager', async (req, res) => {


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
app.get("/getReportOpinions", async (req, res) => {
    await promiseQuery(`SELECT  o.*, c.first_name as c_first ,c.last_name as c_last,e.first_name,e.last_name
    FROM db.opinion o join client c on o.clientId=c.id_client
    join employee e on e.emp_id=o.empId
    where report=1`)
})
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

app.get("/getAvgOpinions/:clientId", async (req, res) => {


    const { clientId } = req.params;
    const query = `
    SELECT e.emp_id, e.first_name as 'first_name' ,e.last_name as 'last_name', AVG(o.rank) as 'avg'
    FROM opinion  o RIGHT JOIN employee e ON o.empId = e.emp_id
    GROUP BY o.empId, e.first_name, e.last_name`;
    const opinions = await promiseQuery(query);
    for (let o of opinions) {
        const q = `SELECT * FROM employee_to_client WHERE emp_id = '${o.emp_id}' AND client_id = '${clientId}';`
        const res = await promiseQuery(q);
        if (res.length != 0)
            o.canResponse = true;
        else
            o.canResponse = false;

    }

    res.send(opinions);
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
        await promiseQuery(query, async (err, result) => {
            if (!err) {
                console.log(result);
                const user = await promiseQuery(`SELECT * FROM users WHERE id = ${result.insertId}`);
                res.send({ success: true, user: user });

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



//צריך לחשוב על אפשרות לקבל רמת דחיפות של העדפה
//SELECT * FROM employee WHERE status_emp = 3 AND  type = 1;
app.get("/getListOfEmps/:id", async (req, res) => {
    const { id } = req.params;
    const { city, gender, age, language, stars, preventPref, minAge, maxAge } = req.query;  //העדפות של לקוח
    try {
        const clientArr = await promiseQuery(`SELECT *  FROM client WHERE id_client='${id}';`);
        const client = clientArr[0]
        const emps = await promiseQuery(`SELECT * FROM employee WHERE status_emp = 3 AND  type = ${client.empType}`);

        //-------------לוגיקה
        for (let employee of emps) {
            let count = 0;

            let preferenceArr = await promiseQuery(`SELECT * FROM preferences WHERE emp_id=${employee.emp_id}`)

            //אפשרות להתעלם מהעדפות עובד - preventEmpPrefernces ==true
            if ((!preventPref || preventPref == false) && preferenceArr.length > 0) {
                const preference = preferenceArr[0];
                // if (preference.age == ? )
                //     count++;
                if (preference.disabllity_perc >= client.disability_perc) { count++; }
                if (client.empType == 2 && preference.hours_in_day >= client.HoursInDay)
                    count++;
                if (preference.status_client >= client.client_status)
                    count++;
                if (preference.gender == client.gender)
                    count++;
                if (client.empType == 2 && employee.city == client.city)
                    count++;
            }

            //נקבל מהלקוח פירוט של העדפות שלו בזמן החיפוש - מספר כוכבים, עיר, מין, שפה, גיל ונוסיף לחישוב
            if (city && city == employee.city)
                count += 4;
            if (gender && gender == employee.gender)
                count += 4;
            // if (age && age == ?)  //שימו לב. ההשווה היא על טווח גילאים
            //     count += 2;
            if (language) {
                const languageQuery = `SELECT language FROM languages_to_employee  WHERE emp_id = '${employee.emp_id}' AND language = '${language}';`
                const result = await promiseQuery(languageQuery);
                if (result.length > 0)
                    count += 4;
            }
            if (stars) {
                const avgQuery = ` SELECT  AVG(o.rank) as 'avg'
                FROM opinion  o RIGHT JOIN employee e ON o.empId = e.emp_id
                WHERE emp_id = '${employee.emp_id}' 
                GROUP BY o.empId, e.first_name, e.last_name
                HAVING AVG(o.rank)>= ${stars};`;
                const result2 = await promiseQuery(avgQuery);
                if (result2.length > 0)
                    count += 4;

            }

            employee.count = count

        }
        res.send(emps);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }



})
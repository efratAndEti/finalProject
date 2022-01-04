const {promiseQuery}  = require('../sql/sql')

const getUsers = async () => {
    //console.log("arrived to action")
    const query = `SELECT * FROM users `;
    console.log(query);
    try {
        const result = await promiseQuery(query);

        return { result };
    }
    catch (err) {
        return { err };
    }
}



module.exports = { getUsers }

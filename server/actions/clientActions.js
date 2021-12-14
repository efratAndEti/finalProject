const {promiseQuery}  = require('../sql/sql')

const getClientById = async (clientId) => {
    console.log("arrived to action")
    const query = `SELECT * FROM client WHERE id_client = ${clientId}`;
    console.log(query);
    try {
        const result = await promiseQuery(query);

        return { result };
    }
    catch (err) {
        return { err };
    }
}



module.exports = { getClientById }

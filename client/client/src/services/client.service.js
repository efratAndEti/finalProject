import axios from 'axios';

const getClientsByStatus = async (status) => {
    // axios.get(`http://localhost:8080/client/findClientByStatus/${status}`).then((res) => {
    //     console.log(res);
    //     const data = res.data;
    //     return data;
    // }).catch((err) => {
    //     console.log(err);
    //     return null;
    // })
    try {
        const result = await axios.get(`http://localhost:8080/client/findClientByStatus`);
        console.log(result);

        return result.data;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

export { getClientsByStatus }
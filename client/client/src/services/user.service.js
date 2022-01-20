import axios from 'axios';


const getUsers = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/getUsers`);
        console.log(result);

        return result.data;
    }
    catch (err) {
        console.log(err);
        return null;
    } 
}

const loginUser = async (userName, password) => {
    try {
        const body = {userName, password};
        const result = await axios.post(`http://localhost:8080/login`, body);
        console.log(result);

        return result.data;
    }
    catch (err) {
        console.log(err);
        return null;
    } 
}

export {getUsers, loginUser};
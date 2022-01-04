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

export {getUsers};
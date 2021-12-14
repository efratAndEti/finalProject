import axios from 'axios';


const getStatuses = async () => {
    try {
        const result = await axios.get(`http://localhost:8080/status/getStatuses`);
        console.log(result);

        return result.data;
    }
    catch (err) {
        console.log(err);
        return null;
    } 
}

export {getStatuses};
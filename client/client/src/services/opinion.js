const getOpinionById = async (userName, password) => {
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
export {getOpinionById}
// FILE IMPORTS
const USER = require('../data-access-layer/register-user');

//#region Function to register user
exports.registerUser = async(req) => {
    try {
        let json = { error: null, result: null };

        if ((!!req.first_name) && (!!req.last_name) && (!!req.username) && (!!req.password)) {
            let response = await USER.saveUser(req);
            return response;
        } else {
            json.error = "Insufficient Data";
            return json;
        }
    } catch (error) {
        console.log(error);
    }
}
//#endregion

//#region Function to get all registered users
exports.getUsers = async() => {
    try {
        
    } catch (error) {
        
    }
}
//#endregion
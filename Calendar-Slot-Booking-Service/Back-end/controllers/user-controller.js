// FILE IMPORTS
const USER_REGISTRATION = require('../data-access-layer/register-user');
const USERS = require('../data-access-layer/get-users');
const USER_LOGIN = require('../data-access-layer/authenticate-user');

//#region Function to register user
exports.registerUser = async(req) => {
    try {
        let json = { error: null, result: null };

        if ((!!req.first_name) && (!!req.last_name) && (!!req.username) && (!!req.password)) {
            let response = await USER_REGISTRATION.saveUser(req);
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
exports.getRegisteredUsers = async() => {
    try {
        let response = await USERS.getUsers();
        return response;
    } catch (error) {
        console.log(error);
    }
}
//#endregion

//#region  Function to authenticate user while logging into the system
exports.authenticateUser = async(req) => {
    try {
        let json = { error: null, result: null };
        if ((!!req.username) && (!!req.password)) {
            let response = await USER_LOGIN.allowUser(req); 
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
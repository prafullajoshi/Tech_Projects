// DECLARATION OF CONSTANTS
const MONGO_CONFIG = require('../configurations/mongo-config');
const MONGO_UTIL = require('../utils/mongo-util');

//#region Function to verify credentials of users
exports.allowUser = async(object) =>{
    try {
        let json = { error: null, result: null };
        let collection_name = MONGO_CONFIG.COLLECTIONS.USERS;
        let mongo_client = await MONGO_UTIL.dbClient();
        let isAuthenticated = await mongo_client.collection(collection_name).aggregate([
            {
                '$match' : { 
                    "username" : object.username,
                    "password" : object.password
                 }
            }
        ]).toArray();
        if (isAuthenticated.length != 0) {
            json.result = isAuthenticated;
            return json;
        } else {
            json.error = "Authentication Failed! Incorrect username or password !";
            return json;
        }
    } catch (error) {
        let err = new Error(error.toString());
        err.name = 'allowUser() :: authenticate-users';
        err.name = 'Something went wrong in allowUser() inside DAL';
        err.stack = error;
    }
}
//#endregion
// DECLARATION OF CONSTANTS
const MONGO_CONFIG = require('../configurations/mongo-config');
const MONGO_UTIL = require('../utils/mongo-util');

//#region Function to get all registered users
exports.getUsers = async() =>{
    try {
        let json = { error: null, result: null };
        let collection_name = MONGO_CONFIG.COLLECTIONS.USERS;
        let mongo_client = await MONGO_UTIL.dbClient();
        let result = await mongo_client.collection(collection_name).find({}).toArray();
        if (result.length > 0) {
            json.result = result;
            return json;
        } else {
            json.error = "Users Not Found !";
            return json;
        }
    } catch (error) {
        let err = new Error(error.toString());
        err.name = 'getUsers() :: get-users';
        err.name = 'Something went wrong in getUsers() inside DAL';
        err.stack = error;
    }
}
//#endregion
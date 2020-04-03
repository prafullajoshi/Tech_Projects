// DECLARATION OF CONSTANTS
const MONGO_CONFIG = require('../configurations/mongo-config');
const MONGO_UTIL = require('../utils/mongo-util');

//#region Function to insert user object into database
exports.saveUser = async(object) => {
    try {
        let json = { error: null, result: null };
        let collection_name = MONGO_CONFIG.COLLECTIONS.USERS;
        let mongo_client = await MONGO_UTIL.dbClient();
        let isDuplicate = await mongo_client.collection(collection_name).aggregate([
            {
                $match : { username : object.username }
            }
        ]).toArray();

        if (isDuplicate.length > 0) {
            json.error = "This user is already registered!";
            return json;
        }
        let result = await mongo_client.collection(collection_name).insertOne(object);
        if (result.insertedCount < 1) {
            json.error = "User registration error in database !";
            return json;
        } else {
            json.result = "User registered successfully !"
            return json;
        }
    } catch (error) {
        let err = new Error(error.toString());
        err.name = 'saveUser() :: registerUser';
        err.name = 'Something went wrong in saveUser() inside DAL';
        err.stack = error;
    }
};
//#endregion
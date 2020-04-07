// DECLARATION OF CONSTANTS
const MONGO_CONFIG = require('../configurations/mongo-config');
const MONGO_UTIL = require('../utils/mongo-util');

// GLOBAL ENUM
const AVAILABILITY = {
    SET : 1,
    RESET : 0
}

//#region Function to insert time slot object into database
exports.fetchAvailableTimeSlot = async(_username) => {
    try {  
        let json = { error: null, result: null };
        let collection_name = MONGO_CONFIG.COLLECTIONS.TIME_SLOTS
        let mongo_client = await MONGO_UTIL.dbClient();

        let response = await mongo_client.collection(collection_name).aggregate([
            {
                $match : {
                    "username" : _username,
                    "available" : AVAILABILITY.SET
                }
            }
        ]).toArray();
        if (response.length < 1) {
            json.error = "Time-slot fetching error in database !";
            return json;
        } else {
            json.result = response;
            return json;
        }
    } catch (error) {
        let err = new Error(error.toString());
        err.name = 'fetchAvailableTimeSlot() :: time-slot-fetcher';
        err.name = 'Something went wrong in fetchAvailableTimeSlot() inside DAL';
        err.stack = error;
    }
}
//#endregion

// DECLARATION OF CONSTANTS
const MONGO_CONFIG = require('../configurations/mongo-config');
const MONGO_UTIL = require('../utils/mongo-util');

// GLOBAL ENUM
const AVAILABILITY = {
    SET : 1,
    RESET : 0
}

//#region Function to insert time slot object into database
exports.saveTimeSlot = async(object) => {
    try {
        let current_time = new Date().getTime();
        let json = { error: null, result: null };
        let collection_name = MONGO_CONFIG.COLLECTIONS.TIME_SLOTS
        let mongo_client = await MONGO_UTIL.dbClient();

        let twelve_AM = new Date(current_time).setHours(0,0,0,0);           // To get unix epoch timestamp of 12:00:00 AM everyday

        let eleven59_PM = new Date(current_time).setHours(23,59,59);        // To get unix epoch timestamp of 11:59:59 PM everyday

        let isDuplicate = await mongo_client.collection(collection_name).aggregate([
            {
                '$match' : {
                    'start_time' : object.start_time,
                    'end_time' : object.end_time
                }
            },
            {
                '$match' : {
                    'timestamp' : { '$gte' : twelve_AM, '$lte' : eleven59_PM }
                }
            }
        ]).toArray();

        if (isDuplicate.length > 0) {
            json.error = "This time slot is already defined!";
            return json;
        }
        object.timestamp = current_time;                    // Unix epoch time in miliseconds
        object.available = AVAILABILITY.SET;                // Set available flag to 1 for a new slot
        let response = await mongo_client.collection(collection_name).insertOne(object);
        if (response.insertedCount < 1) {
            json.error = "Time-slot insertion error in database !";
            return json;
        } else {
            json.result = "Time-slot inserted successfully !"
            return json;
        }
    } catch (error) {
        let err = new Error(error.toString());
        err.name = 'saveTimeSlot() :: time-slot-definer';
        err.name = 'Something went wrong in saveTimeSlot() inside DAL';
        err.stack = error;
    }
}
//#endregion
// DECLARATION OF CONSTANTS
const MONGO_CONFIG = require('../configurations/mongo-config');
const MONGO_UTIL = require('../utils/mongo-util');

// GLOBAL ENUM
const AVAILABILITY = {
    SET : 1,
    RESET : 0
}

//#region Function to insert time slot object into database
exports.allocateTimeSlot = async(object) => {
    try {
        let current_time = new Date().getTime();
        let json = { error: null, result: null };
        let collection_name = MONGO_CONFIG.COLLECTIONS.TIME_SLOTS
        let mongo_client = await MONGO_UTIL.dbClient();

        //object.timestamp = current_time;

        let findQuery = {username : object.username, start_time : object.start_time, end_time : object.end_time}
        let setQuery = {'$set':{available : AVAILABILITY.RESET, timestamp : current_time }}
        
        let response = await mongo_client.collection(collection_name).updateOne(findQuery, setQuery);
        if (response.modifiedCount < 1) {
            json.error = "Time-slot booking error in database !";
            return json;
        } else {
            json.result = "Time-slot booked successfully !"
            return json;
        }
    } catch (error) {
        let err = new Error(error.toString());
        err.name = 'allocateTimeSlot() :: time-slot-booker';
        err.name = 'Something went wrong in allocateTimeSlot() inside DAL';
        err.stack = error;
    }
}
//#endregion
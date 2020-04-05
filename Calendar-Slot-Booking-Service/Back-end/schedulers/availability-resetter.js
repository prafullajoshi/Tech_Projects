// DECLARATION OF CONSTANTS
const SCHEDULER = require('node-schedule');

// FILE IMPORTS
const MONGO_CONFIG = require('../configurations/mongo-config');
const MONGO_UTIL = require('../utils/mongo-util');

// SCHEDULER CONFIGURATION
const DAILY_SCHEDULE = new SCHEDULER.RecurrenceRule();
DAILY_SCHEDULE.hour = 0;
DAILY_SCHEDULE.minute = 0;
DAILY_SCHEDULE.dayOfWeek = new SCHEDULER.Range(0,6);

// INVOKING SCHEDULER FUNCTIONALITY
SCHEDULER.scheduleJob(DAILY_SCHEDULE, async function () {
    resetAvailableFlag();
});

// GLOBAL ENUM
const AVAILABILITY = {
    SET : 1,
    RESET : 0
}

//#region Function to reset available flag
async function resetAvailableFlag() {
    try {
        let current_time = new Date().getTime();
        
        let collection_name = MONGO_CONFIG.COLLECTIONS.TIME_SLOTS;
        let mongo_client = await MONGO_UTIL.dbClient();
        
        let findQuery = {timestamp : {'$lt':current_time}}
        let setQuery = {'$set':{available : AVAILABILITY.RESET }}
        
        await mongo_client.collection(collection_name).updateMany(findQuery, setQuery);

    } catch (error) {
        let err = new Error(error.toString());
        err.name = 'resetAvailableFlag() :: availability-resetter : scheduler';
        err.name = 'Something went wrong in resetAvailableFlag() inside scheduler';
        err.stack = error;
    }
}
//#endregion


// EXPORTING THE MODULES
module.exports = {
    resetAvailableFlag
}
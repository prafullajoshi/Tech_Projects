// FILE IMPORTS
const TIME_SLOT_DEFINER = require('../data-access-layer/time-slot-definer');
const TIME_SLOT_BOOKER = require('../data-access-layer/time-slot-booker');
const TIME_SLOT_FETCHER = require('../data-access-layer/time-slot-fetcher');

//#region Function to define time slots
exports.defineTimeSlot = async(req) => {
    try {
        let json = { error: null, result: null };
        if ((!!req.username) && (!!req.start_time) && (!!req.end_time)) {
            let response = await TIME_SLOT_DEFINER.saveTimeSlot(req);
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

//#region  Function to book a time slot
exports.bookTimeSlot = async(req) => {
    try {
        let json = {error: null, result: null};
        if ((!!req.username) && (!!req.start_time) && (!!req.end_time)) {
            let response = await TIME_SLOT_BOOKER.allocateTimeSlot(req);
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

//#region Function to get all available slots of a specific user
exports.getAvailableTimeSlots = async(req) => {
    try {
        let json = {error: null, result: null};
        let username = req.params._username;
        if (!!username) {
            let response = await TIME_SLOT_FETCHER.fetchAvailableTimeSlot(username);
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
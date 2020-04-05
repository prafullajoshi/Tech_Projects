// FILE IMPORTS
const TIME_SLOT_DEFINER = require('../data-access-layer/time-slot-definer');

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
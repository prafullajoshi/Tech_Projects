
// DECLRATION OF CONSTANTS 
const EXPRESS = require('express');
const BODY_PARSER = require('body-parser');
const HTTP = require('http');
const CORS = require('cors');
const APP = EXPRESS();
const HOST = 'localhost'
const HTTP_PORT = 1001;

// FILE IMPORTS
const AVAILABILTY_RESETTER = require('./schedulers/availability-resetter');
const USER_CONTROLLER = require('./controllers/user-controller');
const TIME_SLOT = require('./controllers/time-slot-controller');

APP.use(BODY_PARSER.urlencoded({ extended: false }))
APP.use(BODY_PARSER.json())
APP.use(CORS());


//#region POST API : User Registration
APP.post('/user/registration', async(req, res) => {
    if (req._body) {
        let json = await USER_CONTROLLER.registerUser(req.body);
        if (json.error) {
            res.status(400);        // Bad Request
            res.json({ "Error" : json.error });
        } else {
            res.status(201);        // Created
            res.json({"Result":json.result});
        }
    }
});
//#endregion

//#region GET API : Registered Users
APP.get('/users', async(req, res) => {
    let json = await USER_CONTROLLER.getRegisteredUsers();
    if (json.error) {
        res.status(404);        // Not Found
        res.json({ "Error" : json.error });
    } else {
        res.status(200);        // OK
        res.json({"Result":json.result});
    }
});
//#endregion

//#region POST API : User Login 
APP.post('/login', async(req, res) => {
    if (req._body) {
        let json = await USER_CONTROLLER.authenticateUser(req.body);
        if (json.error) {
            res.status(401);        // Unauthorized
            res.json({ "Error" : json.error });
        } else {
            res.status(200);        // OK
            res.json({"Result":json.result});
        }
    }
});
//#endregion

//#region POST API : Define Available Slots
APP.post('/slot/registration',async(req, res) => {
    if (req._body) {
        let json = await TIME_SLOT.defineTimeSlot(req.body);
        if (json.error) {
            res.status(400);        // Bad Request
            res.json({ "Error" : json.error });
        } else {
            res.status(201);        // Created
            res.json({"Result":json.result});
        }  
    }
});
//#endregion

//#region PUT API : Book Available Slots
APP.put('/slot/booking', async(req, res) => {
    if (req._body) {
        let json = await TIME_SLOT.bookTimeSlot(req.body);
        if (json.error) {
            res.status(400);        // Bad Request
            res.json({ "Error" : json.error });
        } else {
            res.status(201);        // Created
            res.json({"Result":json.result});
        }
    }
});
//#endregion

//#region GET API : Get All Available Slots of a Specific User
APP.get('/slots/:_username', async(req, res) => {
    let json = await TIME_SLOT.getAvailableTimeSlots(req);
    if (json.error) {
        res.status(404);        // Not Found
        res.json({ "Error" : json.error });
    } else {
        res.status(200);        // OK
        res.json({"Result":json.result});
    }
});
//#endregion

const HTTP_SERVER = HTTP.createServer(APP);
HTTP_SERVER.listen(HTTP_PORT, HOST);

console.log('Node server is running on Port :'+HTTP_PORT+' with Host : '+HOST);
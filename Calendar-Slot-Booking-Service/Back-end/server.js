
// DECLRATION OF CONSTANTS 
const EXPRESS = require('express');
const BODY_PARSER = require('body-parser');
const HTTP = require('http');
const CORS = require('cors');
const APP = EXPRESS();
const HOST = 'localhost'
const HTTP_PORT = 1001;

// FILE IMPORTS
const USER_CONTROLLER = require('./controllers/user-controller');


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



const HTTP_SERVER = HTTP.createServer(APP);
HTTP_SERVER.listen(HTTP_PORT, HOST);

console.log('Node server is running on Port :'+HTTP_PORT+' with Host : '+HOST);
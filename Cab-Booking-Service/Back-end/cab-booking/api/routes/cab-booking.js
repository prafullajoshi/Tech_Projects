// console.log(`WELCOME`);
const EXPRESS = require(`express`);
const ROUTER = EXPRESS.Router();
const MONGOOSE = require(`mongoose`);
const AUTH = require("../../config/keys");
const REQUIRE_LOGIN = require(`../../middleware/require-login`);

console.log(`WELCOME, CAB BOOKING`);

//#region GET API for booking a cab
ROUTER.get('/book', function(req, res, next) {
    console.log(`Welcome to Cab Booking!!`);
    
    /*if (req.query.lattitude && req.query.longitude && !isNaN(req.query.lattitude) && !isNaN(req.query.longitude)) {
      let lattitude = parseInt(req.query.lattitude);
      let longitude = parseInt(req.query.longitude);
      let userLocation = {
        lattitude: lattitude,
        longitude: longitude
      };
      let cab = getClosestCab(userLocation, color);
      if (cab) {
        cab.isBooked = true;
        res.json({
          message: "Cab booked!",
          cabID: cab.id,
          driverName: cab.driverName,
          driverNumber: cab.driverNumber,
          location: cab.location
        });
      } else {
         res.json({
           message: "No cabs available!"
         });
      }
  
    } else {
      res.json({
        message: "Invalid/Missing parameters"
      });
    }*/

  });
//#endregion
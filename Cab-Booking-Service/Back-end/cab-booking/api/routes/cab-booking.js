const EXPRESS = require(`express`);
const ROUTER = EXPRESS.Router();
const MONGOOSE = require(`mongoose`);
const USER = MONGOOSE.model(`User`);
const BOOKING = MONGOOSE.model(`Booking`);
const BCRYPT = require(`bcryptjs`);         // For hashing the password in MongoDB
const JWT = require(`jsonwebtoken`);
const AUTH = require(`../../config/keys`);
const REQUIRE_LOGIN = require(`../../middleware/require-login`);

const HELPER = require(`../helpers/cab-helpers`);


//#region POST API for Signup
ROUTER.post(`/signup`, (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ error: `Please add all the fields!` });
    }
    USER.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: `User already exists with that email!` });
            }
            BCRYPT.hash(password, 12)
                .then(hashedPassword => {
                    const user = new USER({
                        email,
                        password: hashedPassword,
                        name
                    })
                    user.save()
                        .then(user => {
                            res.status(200).json({ message: `Saved Successfully!!` });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
        })
        .catch(err => {
            console.log(err);
        })
})
//#endregion

//#region POST API for Sign In
ROUTER.post(`/signin`, (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: `Please add email or password` });
    }
    USER.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: `Invalid email or password` });
            }
            BCRYPT.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.json({message: `Successfully Signed In`});
                        const token = JWT.sign({ _id: savedUser._id }, AUTH.JWT_SECRET );
                        res.json({ token: token });
                    }
                    else {
                        return res.status(422).json({ error: `Invalid email or password` });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
})
//#endregion

//#region GET API for booking a cab
ROUTER.get('/book',REQUIRE_LOGIN, async function(req, res, next) {
    console.log(`req :: ${req.user.email}`);
    
    if (req.query.sourceLattitude && req.query.sourceLongitude && !isNaN(req.query.sourceLattitude) && !isNaN(req.query.sourceLongitude)) {
      let lattitude = parseInt(req.query.sourceLattitude);
      let longitude = parseInt(req.query.sourceLongitude);
      let userLocation = {
        lattitude: lattitude,
        longitude: longitude
      };
      let cab = HELPER.getClosestCab(userLocation);
      if (cab) {
        cab.isBooked = true;
        
        // For saving booking into DB 
        // let userEmail = USER.findOne({})
        
        let destLocation ={
            lattitude: req.query.destLattitude,
            longitude: req.query.destLongitude
        }
        const booking = new BOOKING({
            email: req.user.email,
            cabId: cab.id,
            driverName: cab.driverName,
            driverNumber: cab.driverNumber,
            trip:{
                source: userLocation,
                destination: destLocation
            },
            date: new Date()
        })
        booking.save()
            .then(booking => {
                // res.status(200).json({ message: `Booking Saved Successfully!!` });
                console.log(`Booking Saved Successfully!!`);
            })
            .catch(err => {
                console.log(err);
            })

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
    }

  });
//#endregion

//#region GET API for fetching all bookings
ROUTER.get(`/allbookings`, REQUIRE_LOGIN, function(req, res, next){
    BOOKING.find({email:req.user.email})
           .then(allBookings => {
                return res.status(200).json({allBookings : allBookings});
           })
           .catch(err => {
               console.log(err);
           })
})
//#endregion


module.exports = ROUTER;
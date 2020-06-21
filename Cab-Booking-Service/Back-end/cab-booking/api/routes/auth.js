const EXPRESS = require(`express`);
const ROUTER = EXPRESS.Router();
const MONGOOSE = require(`mongoose`);
const USER = MONGOOSE.model("User");
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
ROUTER.get('/book',REQUIRE_LOGIN, function(req, res, next) {
    // console.log(`Welcome to Cab Booking!!`);
    if (req.query.lattitude && req.query.longitude && !isNaN(req.query.lattitude) && !isNaN(req.query.longitude)) {
      let lattitude = parseInt(req.query.lattitude);
      let longitude = parseInt(req.query.longitude);
      let userLocation = {
        lattitude: lattitude,
        longitude: longitude
      };
      let cab = HELPER.getClosestCab(userLocation);
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
    }

  });
//#endregion


module.exports = ROUTER;
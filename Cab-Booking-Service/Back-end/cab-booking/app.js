
const EXPRESS = require(`express`);
const MONGOOSE = require(`mongoose`);
const APP = EXPRESS();                      // Invoking Express
const PORT = 5000;
const MONGO = require(`./config/keys`);
// const ROUTES = require('./api/routes/cab-booking');
const MONGO_URL = MONGO.DATABASE.URL;

MONGOOSE.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

MONGOOSE.connection.on(`connected`, () => {
    console.log(`Connected to MongoDB!!`);
})

MONGOOSE.connection.on(`error`, (err) => {
    console.log(`Error Connecting : ${err}`);
})

require(`./model/cab`);
require(`./model/user`);
// require(`./model/`);
// require(`./models/post`);

APP.use(EXPRESS.json());
// APP.use(require(`./api/routes/cab-booking`));
// APP.use(require(`./middleware/require-login`));
APP.use(require(`./api/routes/auth`));

// require(`./api/routes/cab-booking`);

// APP.use(`/`, ROUTES);
// APP.use(require(`./api/routes/cab-booking`));
  
// MongoDB User User : prafulla
// MongoDB User Password : prafs123

APP.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})

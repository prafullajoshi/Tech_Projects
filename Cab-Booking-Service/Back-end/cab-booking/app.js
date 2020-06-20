// 'use strict';

//#region  Swagger Default Code Starts Here

/*var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
}); */

//#endregion

const EXPRESS = require(`express`);
const MONGOOSE = require(`mongoose`);
const APP = EXPRESS();                      // Invoking Express
const PORT = 5000;
const MONGO = require(`./config/keys`);
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
// require(`./models/post`);

APP.use(EXPRESS.json());
APP.use(require(`./api/routes/auth`));
// APP.use(require(`./api/routes/auth`));

// MongoDB User User : prafulla
// MongoDB User Password : prafs123

APP.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})

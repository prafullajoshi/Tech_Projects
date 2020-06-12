const EXPRESS = require(`express`);
const MONGOOSE = require(`mongoose`);
const APP = EXPRESS();
const PORT = 5000;
const {MONGO_URL} = require(`./keys`);

MONGOOSE.connect(MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

MONGOOSE.connection.on(`connected`, () => {
    console.log(`Connected to MongoDB!!`);
})

MONGOOSE.connection.on(`error`, (err) => {
    console.log(`Error Connecting : ${err}`);
})

// MongoDB User User : prafulla
// MongoDB User Password : prafs123

APP.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
})
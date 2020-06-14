const MONGOOSE = require(`mongoose`);
const USER_SCHEMA = new MONGOOSE.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

MONGOOSE.model(`User`, USER_SCHEMA);
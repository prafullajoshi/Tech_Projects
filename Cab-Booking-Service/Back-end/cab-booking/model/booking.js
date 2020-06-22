const MONGOOSE = require(`mongoose`);
const BOOKING_SCHEMA = new MONGOOSE.Schema({
    email: {
        type: String,
        required: true
    },
    cabId: {
        type: Number,
        required: true
    },
    driverName: {
        type: String,
        required: true
    },
    driverNumber: {
        type: String,
        required: true
    },
    trip: {
        source: {
            type: Object,
            required: true       
        },
        destination: {
            type: Object,
            required: true
        }
    },
    date: {
        type: Date,
        required: true
    }
})

MONGOOSE.model(`Booking`, BOOKING_SCHEMA);
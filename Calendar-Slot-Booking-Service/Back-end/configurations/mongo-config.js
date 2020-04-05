// Database connection string
const DATABASE = {
    URL: 'mongodb://127.0.0.1:27017/',
    NAME: 'csbs_db'
};

// Collections names in mongodb
const COLLECTIONS = {
    USERS: 'users',
    TIME_SLOTS: 'timeSlots'
};

module.exports = {
  DATABASE,
  COLLECTIONS  
};

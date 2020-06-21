// module.exports = {
//     MONGO_URL: `mongodb+srv://prafulla:prafs123@pj-cluster-00-fagwn.mongodb.net/<dbname>?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`,
//     JWT_SECRET: `fefohbwsnfkbnrtyiuawmnbaq`
// }

// Database connection string
const DATABASE = {
    URL: 'mongodb://127.0.0.1:27017/cbs_db',
    NAME: 'cbs_db'
};

// Collections names in mongodb
const COLLECTIONS = {
    USERS: 'users',
};

const AUTH ={
    JWT_SECRET: `qwrqewfdnkiugibecwpjzmka`
}

module.exports = {
  DATABASE,
  COLLECTIONS,
  AUTH
};
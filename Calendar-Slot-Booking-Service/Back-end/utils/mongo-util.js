// DECLARATION OF CONSTANTS
const MONGO = require('mongodb').MongoClient;
const MONGO_CONFIG = require('../configurations/mongo-config');
const MONGO_URL = MONGO_CONFIG.DATABASE.URL;
const DATABASE_NAME = MONGO_CONFIG.DATABASE.NAME;
let MONGO_CLIENT;

//#region Function to get MongoDB client 
function getMongoClient(p_database) {
    if (!MONGO_CLIENT) {
        return new Promise((resolve, reject) => {
            MONGO.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 200 }, async function (err, client) {
                if (err) {
                    return reject(err);
                }
                MONGO_CLIENT = client.db(p_database);
                resolve(MONGO_CLIENT);
            });
        });
    } else {
        return (MONGO_CLIENT);
    }
};
//#endregion

module.exports.dbClient = async () => {
    let database = await getMongoClient(DATABASE_NAME);
    return (database);
}
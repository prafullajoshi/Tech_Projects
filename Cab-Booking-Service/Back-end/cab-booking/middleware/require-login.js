const JWT = require(`jsonwebtoken`);
const AUTH = require(`../config/keys`);
const MONGOOSE = require(`mongoose`);
const USER = MONGOOSE.model("User");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    // authorization === Bearer fcshcskbcsiuhiojpudekjhiurg
    if (!authorization) {
        return res.status(401).json({ error: `You must log in first.` });
    }
    const token = authorization.replace(`Bearer `, ``);
    JWT.verify(token, AUTH.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: `You must log in first.` });
        }
        const { _id } = payload;
        USER.findById(_id).then(userData => {
            req.user = userData;
            next();
        })
    });
}
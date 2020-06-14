const EXPRESS = require(`express`);
const ROUTER = EXPRESS.Router();
const MONGOOSE = require(`mongoose`);
const USER = MONGOOSE.model("User");
const BCRYPT = require(`bcryptjs`);         // For hashing the password in MongoDB
const JWT = require(`jsonwebtoken`);
const { JWT_SECRET } = require(`../keys`);
const REQUIRE_LOGIN = require(`../middleware/requireLogin`)


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
                        const token = JWT.sign({ _id: savedUser._id }, JWT_SECRET);
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

// ROUTER.get(`/protected`,REQUIRE_LOGIN, (req, res) => {
//     res.send("Hello");
// })


module.exports = ROUTER;
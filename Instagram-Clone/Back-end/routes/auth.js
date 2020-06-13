const EXPRESS = require(`express`);
const { Router } = require("express");
const ROUTER = EXPRESS.Router();
const MONGOOSE = require(`mongoose`);
const USER = MONGOOSE.model("User");

ROUTER.get(`/`,(req, res) => {
    res.send(`Hello`);
})

ROUTER.post(`/signup`,(req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({error : `Please add all the fields!`});
    }
    USER.findOne({email:email})
    .then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({error : `User already exists with that email!`});
        }
        const user = new USER({
            email,
            password,
            name
        })
        user.save()
        .then(user => {
            res.status(200).json({message : `Saved Successfully!!`});
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
    })
})



module.exports = ROUTER;
const EXPRESS = require(`express`);
const ROUTER = EXPRESS.Router();
const MONGOOSE = require(`mongoose`);
const REQUIRE_LOGIN = require(`../middleware/requireLogin`);
const POST = MONGOOSE.model(`Post`);

ROUTER.post(`/createpost`,REQUIRE_LOGIN, (req, res) => {
    const {title, body} = req.body;
    if (!title || !body) {
        return res.status(422).json({error : `Please add all fields`});
    }
    req.user.password = undefined;
    const post = new POST({
        title: title,
        body:body,
        postedBy:req.user
    });
    post.save()
        .then(result => {
            res.json({post:result});
        })
        .catch(err => {
            console.log(err);
        })
})


module.exports = ROUTER;
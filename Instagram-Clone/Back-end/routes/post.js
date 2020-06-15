const EXPRESS = require(`express`);
const ROUTER = EXPRESS.Router();
const MONGOOSE = require(`mongoose`);
const REQUIRE_LOGIN = require(`../middleware/requireLogin`);
const POST = MONGOOSE.model(`Post`);

ROUTER.post(`/createpost`, REQUIRE_LOGIN, (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(422).json({ error: `Please add all fields` });
    }
    req.user.password = undefined;
    const post = new POST({
        title: title,
        body: body,
        postedBy: req.user
    });
    post.save()
        .then(result => {
            res.json({ post: result });
        })
        .catch(err => {
            console.log(err);
        })
})


// ROUTER.get(`/allpost`, (req, res) => {
//     POST.find()
//         .populate("postedBy","_id name")
//         .then(posts => {
//             res.json({ posts: posts });
//         })
//         .catch(err => {
//             console.log(err);
//         })
// })

ROUTER.get(`/allpost`, (req, res) => {
    POST.find()
        // .populate("_id name")
        // .populate("postedBy","name", "User")
        .then(posts => {
            console.log(posts);
            res.json({ posts: posts });
        })
        .catch(err => {
            console.log(err);
        })
        
        // .exec(function (err, posts) {
        //     if (err) return handleError(err);
        
        //     console.log(`posts :: ${posts}`);
        //     // prints "The author is Ian Fleming"
        //   });
        // .then(posts => {
        //     res.json({ posts: posts });
        // })
        // .catch(err => {
        //     console.log(err);
        // })
})

module.exports = ROUTER;
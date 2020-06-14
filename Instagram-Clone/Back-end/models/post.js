const MONGOOSE = require(`mongoose`);
const OBJECT_ID = MONGOOSE.Schema.Types;

// console.log(`Object ID :${OBJECT_ID}`);
const POST_SCHEMA = new MONGOOSE.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default: `No Photo`
    },
    postedBy:{
        type:OBJECT_ID,
        ref:`User`
    }
})

MONGOOSE.model(`Post`, POST_SCHEMA);
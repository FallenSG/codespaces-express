const mongoose = require('mongoose')
const Joi = require('joi')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        firstName: {type:String},
        lastName: {type:String},
        email: {type:String},
        pass: {type:String}
    }
)
 const UserSchemaJoi = ""//new Joi ({
//     firstName: {type:String, required:true},
//     lastName: { type: String, required: true },
//     email: { type: String, required: true },
//     pass: { type: String, required: true },

// })

const User = mongoose.model("User", UserSchema);

module.exports = { User, UserSchemaJoi }
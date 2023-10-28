const mongoose = requrie('mongoose')
const Schema = mongoose.Schema

const forgotPassSchema = new Schema({
    token: { type:String }
})

const forgotPass = mongoose.model('forgotPass', forgotPassSchema);

module.exports = { forgotPass }
const { User, UserSchemaJoi } = require('../models/user')
const bcrypt = require('bcrypt')
const ENV = require('dotenv').config().parsed


module.exports = async (req, res) => {
    try{
        const salt = bcrypt.genSaltSync(10)
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            pass: await bcrypt.hash(req.body.pass, salt),
        }

        const user = await User.findOne({ email: data.email });
        if(user) return res.send("User with same email id already exist");

        await new User(data).save()
        return res.render('/workspaces/codespaces-express/views/sign_in.pug')
       
    }
    catch(err){
        console.log(err)
        return res.status(400).send("Encountered Error while trying to save data!! Please try again")
    }
}
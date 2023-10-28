const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { User, UserSchemaJoi } = require('../models/user')
const ENV = require('dotenv').config().parsed

module.exports = async (req, res) => {
    try {
        const data = {
            email: req.body.email,
            pass: req.body.pass
        }

        const user = await User.findOne({ email: data.email });
        if (!user) return res.send("No Such user exists");

        
        else if(!bcrypt.compareSync(data.pass, user.pass)){
            return res.status(402).send("Wrong Credentials")
        }

        
        const token = jwt.sign({ email: user.email, pass: user.pass }, ENV.secret);
        return res.send(token)

    }
    catch (err) {
        console.log(err)
        return res.status(400).send("Encountered Error while logging in!! Please try again")
    }
}
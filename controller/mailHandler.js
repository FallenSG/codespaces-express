const jwt = require('jsonwebtoken')

const { User, UserSchemaJoi } = require('../models/user')
const ENV = require('dotenv').config().parsed

module.exports = async (req, res) => {
    try {
        const data = {
            email: req.body.email,
        }

        const user = await User.findOne({ email: data.email });
        if (!user) return res.send("No Such user exists");

       
    }
    catch (err) {
        console.log(err)
        return res.status(400).send("Encountered Error while logging in!! Please try again")
    }
}
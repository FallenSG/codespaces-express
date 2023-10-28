const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

const ENV = require('dotenv').config().parsed
router.get('/:token', async (req, res) => {
    try {
        const token = req.params.token;
        const data = jwt.decode(token, ENV.secret)

        const user = await User.findOne({ email: data.email, pass: data.pass })
        if (user) {
            return res.send(user)
        }
        return res.send("Invalid Token")
    }
    catch (err) {
        console.log(err)
        res.status(400).send("Error while fetching")
    }
})


module.exports = router